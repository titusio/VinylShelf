{
  description = "Development Environment for VinylShelf";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
    forAllSystems = f: nixpkgs.lib.genAttrs systems (system:
      f (import nixpkgs { inherit system; }));
  in {
    devShells = forAllSystems (pkgs:
    let
      packages = with pkgs; [
        # SvelteKit toolchain — bun is the runtime and package manager;
        # node stays for tooling that still shells out to it
        bun
        nodejs_22

        # language servers / tooling
        svelte-language-server
        typescript-language-server
        typescript # tsserver fallback; the workspace copy wins when present
        vscode-langservers-extracted # html, css, json, eslint
        tailwindcss-language-server
      ];

      # locally installed binaries (vite, svelte-kit, ...) take precedence
      basePath = ''
        export PATH="$PWD/node_modules/.bin:$PATH"
      '';
    in {
      default = pkgs.mkShell {
        inherit packages;

        shellHook = basePath + ''
          echo "VinylShelf dev shell — bun $(bun --version), node $(node --version)"

          # drop into zsh for interactive use, but keep `nix develop -c ...` working
          case "$-" in
            *i*)
              if [ -z "$IN_NIX_ZSH" ]; then
                export IN_NIX_ZSH=1
                exec ${pkgs.zsh}/bin/zsh
              fi
              ;;
          esac
        '';
      };

      # Same toolchain, no banner and no zsh exec — for coding agents and CI,
      # where stray output and a shell swap corrupt command results.
      agent = pkgs.mkShell {
        inherit packages;
        shellHook = basePath;
      };
    });
  };
}

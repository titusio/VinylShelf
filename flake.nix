{
  description = "Development Environment for VinylShelf";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs }: 
  let 
    system = "x86_64-linux"; 
    pkgs = import nixpkgs { inherit system; };
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = [
        pkgs.dotnet-sdk_8   
        pkgs.dotnet-runtime
				# entity framework command line utils
				pkgs.dotnet-ef
				pkgs.zsh
      ];

      shellHook = ''
	exec zsh
      '';
    };
  };
}

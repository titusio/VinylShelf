<script lang="ts">
  import { page } from "$app/state";

  let { children } = $props();

  const tabs = [
    { href: "/library", label: "Records" },
    { href: "/library/artists", label: "Artists" },
  ];
</script>

<nav class="border-b border-line">
  <div class="mx-auto max-w-5xl px-6">
    <div class="tabs">
      {#each tabs as tab (tab.href)}
        <a
          class="tab"
          href={tab.href}
          aria-current={page.url.pathname === tab.href ? "page" : undefined}
        >
          {tab.label}
        </a>
      {/each}
    </div>
  </div>
</nav>

{@render children()}

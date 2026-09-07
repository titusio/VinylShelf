<script lang="ts">
  import { page } from "$app/state";

  let { children } = $props();

  const tabs = [
    { href: "/library", label: "Records" },
    { href: "/library/artists", label: "Artists" },
  ];
</script>

<nav class="border-b border-gray-200 px-3">
  <div class="flex flex-row space-x-1">
    {#each tabs as tab (tab.href)}
      <a
        class="px-3 py-2 font-bold border-b-2 {page.url.pathname === tab.href
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900'}"
        href={tab.href}
      >
        {tab.label}
      </a>
    {/each}
  </div>
</nav>

{@render children()}

<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<header class="site-header">
  <div class="site-header-inner">
    <a class="brand" href="/">Vinyl Shelf</a>

    <nav class="flex items-center gap-1">
      <a class="nav-link" href="/library">Library</a>
      <a class="nav-link" href="/browse">Browse</a>
      {#if data.user}
        <form method="POST" action="/logout">
          <button class="nav-link" type="submit">Logout</button>
        </form>
      {:else}
        <a class="nav-link" href="/login">Login</a>
      {/if}
    </nav>
  </div>
</header>

{@render children()}

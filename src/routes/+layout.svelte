<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav>
  <div class="flex md:flex md:grow flex-row-reverse space-x-1 p-4">
    {#if data.user}
      <form method="POST" action="/logout">
        <button class="p-3 font-bold" type="submit">Logout</button>
      </form>
    {:else}
      <a class="p-3 font-bold" href="/login">Login</a>
    {/if}
    <a class="p-3 font-bold" href="/library">Library</a>
  </div>
</nav>

{@render children()}

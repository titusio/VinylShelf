<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.svg";

    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav>
    <div class="flex md:flex md:grow flex-row-reverse space-x-1 p-4">
        <a class="p-3 font-bold" href="/demo/better-auth">Login</a>
        <a class="p-3 font-bold" href="/library">Library</a>
    </div>
</nav>

{@render children()}

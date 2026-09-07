<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Artists</h1>
    <p class="page-subtitle">
      {data.artists.length}
      {data.artists.length === 1 ? "artist" : "artists"} on your shelf.
    </p>
  </header>

  <form class="card" method="POST" action="?/createArtist" use:enhance>
    <h2 class="section-title mb-4">Add an artist</h2>

    <div class="form-row">
      <label class="field w-56">
        <span class="field-label">Name</span>
        <input class="input" name="name" type="text" />
      </label>

      <button class="btn btn-primary">Add artist</button>
    </div>
  </form>

  {#if data.artists.length}
    <ul class="mt-8 divide-y divide-line rounded-card border border-line bg-raised">
      {#each data.artists as artist (artist.id)}
        <li class="px-4 py-3 text-sm">{artist.name}</li>
      {/each}
    </ul>
  {:else}
    <p class="empty-state mt-8">No artists yet. Add one above.</p>
  {/if}
</div>

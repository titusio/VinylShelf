<script lang="ts">
  import { artworkAt } from "$lib/artwork";
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Add a new Record</h1>
    <p class="page-subtitle">High scoreeeeeeeee</p>
  </header>

  <form class="card" method="POST" action="?/createRecord" use:enhance>
    <h2 class="section-title mb-4">Add an artist</h2>

    <div class="form-row">
      <label class="field w-56">
        <span class="field-label">Name</span>
        <input class="input" name="name" type="text" />
      </label>

      <label class="field w-56">
        <span class="field-label">Artist</span>
        <select class="input" name="artistId">
          {#each data.artists as artist (artist.id)}
            <option value={artist.id}>{artist.name}</option>
          {/each}
        </select>
      </label>

      <button class="btn btn-primary">Add Button</button>
    </div>
  </form>

  <form class="card" method="POST" action="?/createRecord" use:enhance>
    <h2 class="section-title mb-4">Find a cover</h2>

    <div class="form-row">
      <button class="btn btn-primary">Search for Cover</button>
    </div>
    <div class="cover-grid mt-6">
      <!-- {#each data.record as candidate, i (candidate.itunesId)} -->
      {#each data.records as record, i (record.id)}
        <label class="cover-choice">
          <input
            type="radio"
            name="itunesId"
            value={record.id}
            checked={i === 0}
          />
          <img
            class="cover-art"
            src={artworkAt(record.artworkUrl || "", 256)}
            alt="Cover of {record.title} by {record.artist.name}"
          />
        </label>
      {/each}
    </div>
  </form>
</div>

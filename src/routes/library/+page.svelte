<script lang="ts">
  import { enhance } from "$app/forms";
  import { authClient } from "$lib/auth-client";
  import { artworkAt } from "$lib/artwork";
  import type { PageProps } from "./$types";

  const session = authClient.useSession();

  let { data, form }: PageProps = $props();

  // findCovers returned a set of candidates: show the confirmation step
  // instead of the entry form. Both its success and its failure carry
  // `candidates`, so a failed lookup still lets you save without a cover.
  const pending = $derived(form && form.candidates ? form : null);
  const candidates = $derived(pending?.candidates ?? []);

  const error = $derived(form && "message" in form ? form.message : null);
</script>

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Records</h1>
    <p class="page-subtitle">
      Hey {$session.data?.user.name}, I hope you are not dizzy from all the
      spinning you've been doing!
    </p>
  </header>

  {#if error}
    <p class="alert alert-error mb-6">{error}</p>
  {/if}

  {#if pending}
    <form class="card" method="POST" action="?/createRecord" use:enhance>
      <input type="hidden" name="title" value={pending.title} />
      <input type="hidden" name="artistId" value={pending.artistId} />

      <h2 class="section-title">Pick a cover</h2>
      <p class="muted mt-1">{pending.artistName} — {pending.title}</p>

      {#if candidates.length}
        <div class="cover-grid mt-6">
          {#each candidates as candidate, i (candidate.itunesId)}
            <label class="cover-choice">
              <input
                type="radio"
                name="itunesId"
                value={candidate.itunesId}
                checked={i === 0}
              />
              <img
                class="cover-art"
                src={artworkAt(candidate.artworkUrl, 256)}
                alt="Cover of {candidate.title} by {candidate.artistName}"
              />
              <p class="cover-title" title={candidate.title}>
                {candidate.title}
              </p>
              <p class="cover-meta">
                {candidate.artistName}{candidate.releaseDate
                  ? ` · ${new Date(candidate.releaseDate).getFullYear()}`
                  : ""}
              </p>
            </label>
          {/each}
        </div>
      {:else}
        <p class="empty-state mt-6">No covers found on iTunes.</p>
      {/if}

      <label class="choice-row mt-6">
        <input
          type="radio"
          name="itunesId"
          value=""
          checked={!candidates.length}
        />
        None of these — add without a cover
      </label>

      <div class="form-actions">
        <button class="btn btn-primary">Add to shelf</button>
        <a class="btn btn-ghost" href="/library">Cancel</a>
      </div>
    </form>
  {:else}
    <form class="card" method="POST" action="?/findCovers" use:enhance>
      <h2 class="section-title mb-4">Add a record</h2>

      <div class="form-row">
        <label class="field w-56">
          <span class="field-label">Title</span>
          <input class="input" name="title" type="text" />
        </label>

        <label class="field w-56">
          <span class="field-label">Artist</span>
          <select class="input" name="artistId">
            {#each data.artists as artist (artist.id)}
              <option value={artist.id}>{artist.name}</option>
            {/each}
          </select>
        </label>

        <label class="field w-44">
          <span class="field-label">Acquired</span>
          <input class="input" name="acquired" type="date" />
        </label>

        <button class="btn btn-primary">Find cover</button>
      </div>
    </form>

    {#if data.records.length}
      <div class="cover-grid mt-8">
        {#each data.records as record (record.id)}
          <div>
            {#if record.artworkUrl}
              <img
                class="cover-art"
                src={artworkAt(record.artworkUrl, 256)}
                alt="Cover of {record.title}"
              />
            {:else}
              <div class="cover-art cover-art-empty">No cover</div>
            {/if}
            <p class="cover-title" title={record.title}>{record.title}</p>
            <p class="cover-meta">{record.artist.name}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p class="empty-state mt-8">
        Your shelf is empty. Add your first record above.
      </p>
    {/if}
  {/if}
</div>

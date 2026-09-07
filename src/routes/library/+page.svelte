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

<h1 class="font-bold text-xl p-3">Library</h1>

<div class="p-3 m-3 flex flex-wrap gap-4">
  {#each data.records as record (record.id)}
    <div class="w-32">
      {#if record.artworkUrl}
        <img
          src={artworkAt(record.artworkUrl, 256)}
          alt="Cover of {record.title}"
          class="w-32 h-32 rounded shadow object-cover"
        />
      {:else}
        <div
          class="w-32 h-32 rounded shadow bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-400"
        >
          No cover
        </div>
      {/if}
      <p class="mt-1 text-sm font-medium truncate" title={record.title}>
        {record.title}
      </p>
      <p class="text-xs text-gray-500 truncate">{record.artist.name}</p>
    </div>
  {/each}
</div>

<p class="p-3">
  Hey {$session.data?.user.name}, I hope you are not dizzy from all the spinning
  you've been doing!
</p>

{#if error}
  <p class="mx-3 p-3 rounded-md bg-red-50 border border-red-200 text-red-700">
    {error}
  </p>
{/if}

{#if pending}
  <form class="p-3" method="POST" action="?/createRecord" use:enhance>
    <input type="hidden" name="title" value={pending.title} />
    <input type="hidden" name="artistId" value={pending.artistId} />

    <h2 class="font-bold">
      Pick the cover for {pending.artistName} — {pending.title}
    </h2>

    {#if candidates.length}
      <div class="flex flex-wrap gap-4 my-3">
        {#each candidates as candidate, i (candidate.itunesId)}
          <label class="w-32 cursor-pointer">
            <input
              type="radio"
              name="itunesId"
              value={candidate.itunesId}
              checked={i === 0}
              class="sr-only peer"
            />
            <img
              src={artworkAt(candidate.artworkUrl, 256)}
              alt="Cover of {candidate.title} by {candidate.artistName}"
              class="w-32 h-32 rounded shadow object-cover ring-blue-600 peer-checked:ring-4"
            />
            <p class="mt-1 text-sm font-medium truncate" title={candidate.title}>
              {candidate.title}
            </p>
            <p class="text-xs text-gray-500 truncate">
              {candidate.artistName}{candidate.releaseDate
                ? ` · ${new Date(candidate.releaseDate).getFullYear()}`
                : ""}
            </p>
          </label>
        {/each}
      </div>
    {:else}
      <p class="my-3 text-gray-600">No covers found on iTunes.</p>
    {/if}

    <label class="block my-3">
      <input type="radio" name="itunesId" value="" checked={!candidates.length} />
      None of these — add without a cover
    </label>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Add to shelf
    </button>
    <a class="px-4 py-2 text-gray-600 hover:text-gray-900" href="/library">
      Cancel
    </a>
  </form>
{:else}
  <form class="p-3" method="POST" action="?/findCovers" use:enhance>
    <label
      >Name
      <input
        name="title"
        type="text"
        class="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </label>
    <label
      >Artist
      <select
        name="artistId"
        class="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {#each data.artists as artist (artist.id)}
          <option value={artist.id}>{artist.name}</option>
        {/each}
      </select>
    </label>
    <label
      >Acquired
      <input
        name="acquired"
        type="date"
        class="mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </label>
    <button
      class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition m-3"
    >
      Find cover
    </button>
  </form>
{/if}

<script lang="ts">
  import { enhance } from "$app/forms";
  import { authClient } from "$lib/auth-client";
  import type { PageProps } from "./$types";

  const session = authClient.useSession();

  let { data }: PageProps = $props();
</script>

<h1 class="font-bold text-xl p-3">Library</h1>

<p class="p-3">
  Hey {$session.data?.user.name}, I hope you are not dizzy from all the spinning
  you've been doing!
</p>

<form class="p-3" method="POST" action="?/createRecord" use:enhance>
  <label
    >Name
    <input
      name="name"
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
    Add new Record
  </button>
</form>

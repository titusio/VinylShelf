<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  import { artworkAt } from "$lib/artwork";
  import type { PageProps } from "./$types";

  const session = authClient.useSession();

  let { data }: PageProps = $props();
</script>

<div class="page">
  <header class="page-header">
    <h1 class="page-title">Records</h1>
    <p class="page-subtitle">
      Hey {$session.data?.user.name}, I hope you are not dizzy from all the
      spinning you've been doing!
    </p>
  </header>

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
</div>

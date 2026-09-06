<script lang="ts">
    import { authClient } from "$lib/auth-client";

    const session = authClient.useSession();
</script>

<h1 class="font-bold text-xl p-3">Library</h1>

<p class="p-3">
    Hey {$session.data?.user.name}, I hope you are not dizzy from all the
    spinning you've been doing!
</p>

<button
    class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition m-3"
>
    Add new Record
</button>

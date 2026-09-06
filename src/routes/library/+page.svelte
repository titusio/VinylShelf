<script lang="ts">
    import { authClient } from "$lib/auth-client";

    const session = authClient.useSession();
</script>

<h1 class="font-bold text-xl p-3">Library</h1>

<p class="p-3">
    Hey {$session.data?.user.name}, I hope you are not dizzy from all the
    spinning you've been doing!
</p>

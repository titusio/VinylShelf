<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
</script>

<div class="page">
  <div class="mx-auto max-w-sm py-8">
    <header class="page-header">
      <h1 class="page-title">Login</h1>
      <p class="page-subtitle">Sign in, or register with a name.</p>
    </header>

    <form class="card" method="POST" action="?/signInEmail" use:enhance>
      <div class="form-stack">
        <label class="field">
          <span class="field-label">Email</span>
          <input class="input" type="email" name="email" />
        </label>

        <label class="field">
          <span class="field-label">Password</span>
          <input class="input" type="password" name="password" />
        </label>

        <label class="field">
          <span class="field-label">Name (for registration)</span>
          <input class="input" name="name" />
        </label>
      </div>

      {#if form?.message}
        <p class="alert alert-error mt-4">{form.message}</p>
      {/if}

      <div class="form-actions">
        <button class="btn btn-primary">Login</button>
        <button class="btn btn-secondary" formaction="?/signUpEmail">
          Register
        </button>
      </div>
    </form>
  </div>
</div>

<script lang="ts">
  import store from "../store/store";

  let username: string = "";
  let password = "";
  let signInDisabled = true;
  let signInError;

  const clearError = () => {
    signInError = undefined;
  };

  const attemptSignIn = async () => {
    const response = await fetch("http://localhost:4000/signIn", {
      credentials: "include",
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    console.log(response);

    if (!response?.ok && response.status === 401) {
      signInError = "Wrong credentials";
      return;
    }

    const json = await response.json();
    store.sessionUser.set(json);
  };

  $: signInDisabled = username.trim() === "" || password.trim() === "";
</script>

<div class="container">
  <div class="panel">
    <form
      class="form"
      on:input={clearError}
      on:submit|preventDefault={attemptSignIn}
    >
      <div>Username</div>
      <input type="text" bind:value={username} />
      <div>Password</div>
      <input type="password" bind:value={password} />
      <button type="submit" disabled={signInDisabled}>Sign in</button>
      {#if signInError}
        <div class="error">{signInError}</div>
      {/if}
    </form>
  </div>
</div>

<style>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .panel {
    width: 250px;
    padding: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .form > :not(:last-child) {
    margin-bottom: 10px;
  }

  .form input {
    display: block;
    width: 100%;
  }

  .error {
    width: 100%;
    padding: 0.5rem;
    font-size: 0.8rem;
    background-color: lightpink;
    color: brown;
  }
</style>

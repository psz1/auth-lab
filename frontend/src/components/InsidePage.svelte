<script lang="ts">
  import store from "../store/store";

  let currentUser = null;

  store.sessionUser.subscribe(value => {
    currentUser = value?.name ?? "";
  });

  const signOut = async () => {
    const response = await fetch("http://localhost:4000/signOut", {
      method: "POST",
      mode: "cors",
      credentials: "include"
    });
    if (response) {
      store.sessionUser.set(null);
    }
  };
</script>

<h1>Welcome, {currentUser}</h1>
<p>This is the inside page</p>
<button type="button" on:click={signOut}>Sign out</button>

<style>
</style>

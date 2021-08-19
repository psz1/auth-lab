<script lang="ts">
  import InsidePage from "./components/InsidePage.svelte";
  import SignIn from "./components/SignIn.svelte";
  import store from "./store/store";

  let signedIn = false;

  store.sessionUser.subscribe(value => {
    signedIn = value !== null;
  });
</script>

<main>
  {#if signedIn}
    <InsidePage />
  {/if}

  {#if !signedIn}
    <SignIn />
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Open Sans", "Helvetica Neue", sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(#app),
  :global(html),
  :global(body) {
    width: 100%;
    height: 100%;
  }

  main {
    width: 100%;
    height: 100%;
  }
</style>

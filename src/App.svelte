<script>
  import { onMount, onDestroy } from "svelte";
  import Home from "./containers/Home.svelte";
  import Game from "./containers/Game.svelte";
  import Header from "./containers/Header.svelte";
  import { socketService } from "./services/socket";

  let inGame = false;

  const handleStartplay = () => {
    inGame = true;
  };

  onMount(async () => {
    socketService.connect();
  });

  onDestroy(async () => {
    socketService.disconnect();
  });
</script>

<style>
  :global(:root) {
    --background: radial-gradient(
      circle,
      hsl(214, 47%, 23%),
      hsl(237, 49%, 15%)
    );
    --circle-background: #e2e2e2;
    --circle-border-width: 10px;
    --circle-size: 200px;
    --triangle-width: calc(var(--circle-size) + 60px);
    --triangle-height: calc(var(--circle-size) + 20px);
    --scissors-gradient: linear-gradient(
      to top,
      hsl(39, 89%, 49%),
      hsl(40, 84%, 53%)
    );
    --paper-gradient: linear-gradient(
      to top,
      hsl(230, 89%, 62%),
      hsl(230, 89%, 65%)
    );
    --rock-gradient: linear-gradient(
      to top,
      hsl(349, 71%, 52%),
      hsl(349, 70%, 56%)
    );
    --borders-color: #4b4f6b;
  }

  :global(body) {
    margin: 0;
    height: 100vh;
    width: 100%;
    max-width: 100%;
    background: var(--background);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: "Barlow Semi Condensed", sans-serif;
  }

  :global(*) {
    outline: none;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    max-width: 1366px;
    width: 100%;
    margin: auto;
    padding: 30px 15px;
    box-sizing: border-box;
  }

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 750px;
  }

  @media screen and (max-width: 600px) {
    :global(:root) {
      --circle-size: 140px;
    }
  }
  @media screen and (max-width: 380px) {
    :global(:root) {
      --circle-size: 120px;
    }
  }
</style>

<div class="wrapper">
  <main>
    <Header />
    {#if inGame}
      <Game />
    {:else}
      <Home on:play={() => handleStartplay()} />
    {/if}
  </main>
</div>

<script>
  import { NotificationDisplay } from "@beyonk/svelte-notifications";
  import { onDestroy } from "svelte";
  import Home from "./containers/Home.svelte";
  import Game from "./containers/Game.svelte";
  import Header from "./components/Header.svelte";
  import { game, currentPlayerInfo } from "./store";
  import { socketService, GAME_EVENTS, gameInfoService } from "./services";
  import { alertService } from "./services";

  let inGame = false;

  const listenGameReady = () => {
    // response: { error: "", data: { guestId: string, guestName: string } }
    socketService.socket.on(GAME_EVENTS.GAME_IS_READY, response => {
      if (response.error) {
        gameInfoService.notifyError(response.error);
      } else {
        const { host, opponent } = response.data;
        game.setId(host.id, host.name);
        game.setId(opponent.id, opponent.name, true);
        inGame = true;
      }
    });
  };

  const listenSomeoneLeft = () => {
    socketService.socket.on(GAME_EVENTS.KICK_PLAYER, response => {
      $currentPlayerInfo.name !== "" && gameInfoService.goHome();
    });
  };

  onDestroy(async () => {
    socketService.disconnect();
  });

  window.onbeforeunload = function() {
    const playerInfo = $currentPlayerInfo;
    $currentPlayerInfo.name !== "" &&
      socketService.emit(GAME_EVENTS.EXIT_GAME, {
        room: $game.id
      });
  };

  socketService.connect();

  socketService.socket.on(GAME_EVENTS.CONNECT_ERROR, response => {
    alertService.showError("Failed to connect to server");
  });

  listenGameReady();
  listenSomeoneLeft();
</script>

<style>
  :global(:root) {
    --background: linear-gradient(
      to bottom,
      hsl(214, 56%, 17%),
      hsl(243, 100%, 2%)
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
    overflow: hidden;
  }

  main {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: -20px;
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

  .connection-error-message {
    text-align: center;
    color: white;
    user-select: none;
  }
</style>

<NotificationDisplay />

<div class="wrapper">
  <main class="fade-in-animation">
    <Header />
    {#if socketService.socket}
      {#if inGame}
        <Game />
      {:else}
        <Home />
      {/if}
    {:else}
      <div class="connection-error-message">
        ¡Houston, we have a problem 😥!
        <br />
        Please, try again in a few minutes ⌚
      </div>
    {/if}
  </main>
</div>

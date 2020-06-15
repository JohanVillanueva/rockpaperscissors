<script>
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { game, currentPlayerInfo } from "../store";
  import Picker from "./../components/Picker.svelte";
  import { socketService, GAME_EVENTS, gameInfoService } from "../services";
  import { GAME_RESULTS } from "./../constants";

  const dispatch = createEventDispatcher();

  let versusResult = "";
  let loading = false;

  const playAgain = () => {
    listenPlayAgain();
    loading = true;
    const playerInfo = $currentPlayerInfo;
    socketService.emit(GAME_EVENTS.PLAY_AGAIN_REQUEST, {
      room: $game.id,
      id: playerInfo.id
    });
  };

  const listenPlayAgain = () => {
    // response: { error: ""}
    socketService.socket.on(GAME_EVENTS.PLAY_AGAIN, response => {
      if (response.error) {
        gameInfoService.notifyError(response.error);
      } else {
        loading = false;
        game.playAgain();
        dispatch("playAgain");
      }
    });
  };

  const listenGameResult = () => {
    // response: { error: "", data: { host, opponent, isWinner: 0 | 1 | 2 } }
    // 0 = DRAW, 1 = HOST WINNER,  2 = OPPONENT WINNER
    socketService.socket.on(GAME_EVENTS.GAME_RESULT, response => {
      if (response.error) {
        gameInfoService.notifyError(response.error);
      } else {
        const { host, opponent, isWinner } = response.data;

        game.setTypePicked(host.typePicked);
        game.setTypePicked(opponent.typePicked, true);

        if (isWinner === 0) {
          versusResult = GAME_RESULTS.DRAW;
        } else {
          game.setWinner(isWinner === 2);
          game.incrementScore(isWinner === 2);

          if (
            (gameInfoService.isHost && isWinner === 1) ||
            (!gameInfoService.isHost && isWinner === 2)
          ) {
            versusResult = GAME_RESULTS.YOU_WIN;
          } else {
            versusResult = GAME_RESULTS.YOU_LOST;
          }
        }
      }
    });
  };

  listenGameResult();

  onDestroy(() => {
    socketService.off(GAME_EVENTS.GAME_RESULT);
  });
</script>

<style>
  .versus {
    margin-top: 25px;
    display: grid;
    grid-template-areas: "picker1 result picker2";
    grid-gap: 35px;
  }

  .versus__picker1 {
    grid-area: picker1;
  }
  .versus__picker2 {
    grid-area: picker2;
  }
  .versus__result {
    grid-area: result;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    font-size: 3.5em;
    font-weight: 700;
  }
  .versus__result__play-again {
    margin-top: 20px;
  }

  @media screen and (max-width: 768px) {
    .versus {
      grid-template-areas:
        "picker1 picker2"
        "result result";
      grid-gap: 10px 40px;
    }
    .versus__result {
      margin-top: 0px;
    }
  }

  @media screen and (max-width: 480px) {
    .versus {
      grid-gap: 10px 15px;
    }
  }
</style>

<div class="versus">
  <div class="versus__picker1">
    <Picker
      playerInfo={$game.players.host}
      isLoading={!$game.players.host.typePicked} />
  </div>
  <div class="versus__picker2">
    <Picker
      playerInfo={$game.players.opponent}
      isLoading={!$game.players.opponent.typePicked} />
  </div>
  <div class="versus__result">
    <div>{versusResult}</div>
    <button
      class="btn btn--large versus__result__play-again"
      on:click={() => playAgain()}
      disabled={loading}>
      {loading ? 'WAITING' : 'PLAY AGAIN'}
    </button>
  </div>
</div>

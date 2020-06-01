<script>
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { game } from "../store";
  import Picker from "./../components/Picker.svelte";
  import { socketService, GAME_EVENTS } from "../services/socket";
  import { GAME_RESULTS } from "./../constants";

  const dispatch = createEventDispatcher();

  let versusResult = "";

  const playAgain = () => {
    socketService.emit(GAME_EVENTS.PLAY_AGAIN, $game.players.host);
    game.playAgain();
    dispatch("playAgain");
  };

  socketService.socket.on(GAME_EVENTS.GAME_RESULT, data => {
    data.players.forEach(function(player) {
      if (player.id !== $game.players.host.id) {
        game.setTypePicked(player.typePicked, true);
      }
    });

    if (data.idWinner === 0) {
      versusResult = GAME_RESULTS.DRAW;
    } else {
      if (data.idWinner === $game.players.host.id) {
        versusResult = GAME_RESULTS.YOU_WIN;
        game.setWinner(false);
        game.incrementScore(false);
      } else {
        versusResult = GAME_RESULTS.YOU_LOST;
        game.setWinner(true);
        game.incrementScore(true);
      }
    }
  });

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
    <Picker playerInfo={$game.players.host} />
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
      on:click={() => playAgain()}>
      Play again
    </button>
  </div>
</div>

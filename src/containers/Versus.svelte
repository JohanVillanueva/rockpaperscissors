<script>
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { game } from "../@store";
  import Picker from "./../components/Picker.svelte";

  const dispatch = createEventDispatcher();
  let socket = getContext("socket");

  const playAgain = () => {
    socket.emit("playAgain", $game.players.host.room);
    game.playAgain();
    dispatch("playAgain");
  };

  socket.on("circleTypeSelected", function(data) {
    data.forEach(function(player) {
      if (player.id !== $game.players.host.id) {
        game.setTypePicked(player.typePicked, true);
        getWinner(player.typePicked);
      }
    });
  });

  const getWinner = opponentTypePicked => {
    if ($game.players.host.typePicked == "rock") {
      if (opponentTypePicked == "paper") game.setWinner(true);
      if (opponentTypePicked == "scissors") game.setWinner(false);
    } else if ($game.players.host.typePicked == "paper") {
      if (opponentTypePicked == "scissors") game.setWinner(true);
      if (opponentTypePicked == "rock") game.setWinner(false);
    } else if ($game.players.host.typePicked == "scissors") {
      if (opponentTypePicked == "rock") game.setWinner(true);
      if (opponentTypePicked == "paper") game.setWinner(true);
    }
  };

  onDestroy(() => {
    socket.off("circleTypeSelected");
  });
</script>

<style>
  .versus {
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
    <div>YOU WIN</div>
    <button
      class="btn btn--large versus__result__play-again"
      on:click={() => playAgain()}>
      Play again
    </button>
  </div>

</div>

<script>
  import { createEventDispatcher } from "svelte";
  import { game } from "../@store";
  import Picker from "./../components/Picker.svelte";
  let loading = true;

  const dispatch = createEventDispatcher();

  const playAgain = () => {
    dispatch("playAgain");
  };
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
      on:click={game.playAgain}>
      Play again
    </button>
  </div>

</div>

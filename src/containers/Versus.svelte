<script>
  import { createEventDispatcher } from "svelte";
  import Picker from "./../components/Picker.svelte";
  export let circlePickedType;
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
  }

  @media screen and (max-width: 480px) {
    .versus {
      grid-gap: 10px 15px;
    }
  }
</style>

<div class="versus">
  <div class="versus__picker1">
    <Picker winner={true} {circlePickedType} />
  </div>
  <div class="versus__picker2">
    <Picker isLoading={loading} />
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

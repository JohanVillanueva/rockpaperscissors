<script>
  import Picker from "./../components/Picker.svelte";
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
    <Picker winner={true} />
  </div>
  <div class="versus__picker2">
    <Picker />
  </div>
  <div class="versus__result">
    <div>YOU WIN</div>
    <button class="btn btn--large versus__result__play-again">
      Play again
    </button>
  </div>

</div>

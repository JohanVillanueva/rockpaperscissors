<script>
  export let points = "12";
</script>

<style>
  .score {
    border-radius: 5px;
    text-align: center;
    background: white;
    padding: 15px 50px;
    box-sizing: border-box;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .score__title {
    letter-spacing: 2px;
    font-size: 1em;
    color: hsl(229, 64%, 46%);
  }

  .score__value {
    font-weight: 700;
    font-size: 4em;
    color: hsl(229, 25%, 31%);
  }

  @media screen and (max-width: 600px) {
    .score {
      padding: 10px 20px;
    }

    .score__title {
      font-size: 0.8em;
    }

    .score__value {
      font-size: 3em;
    }
  }
</style>

<div class="score">
  <div class="score__title">SCORE</div>
  <span class="score__value">{points}</span>
</div>

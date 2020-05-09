<script>
  import Circle from "./Circle.svelte";
  export let playerName = "Picker";
  export let winner = false;
  export let pickerData = {
    icon: "assets/images/icon-paper.svg",
    type: "paper"
  };
</script>

<style>
  .picker {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: white;
  }

  .picker__name {
    text-transform: uppercase;
    margin-bottom: 40px;
    font-size: 1.3em;
    letter-spacing: 2px;
  }

  @media screen and (max-width: 768px) {
    .picker {
      flex-direction: column-reverse;
    }
    .picker__name {
      margin-bottom: 0;
      margin-top: 40px;
    }
  }
</style>

<div class="picker">
  <span class="picker__name">{playerName}</span>
  <Circle {...pickerData} isVersus={true} isWinner={winner} />
</div>

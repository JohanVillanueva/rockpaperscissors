<script>
  import Circle from "./Circle.svelte";

  export let winner = false;
  export let isLoading = false;
  export let circlePickedType = "rock";

  let playerName = "Player";
  let circleTypes = ["rock", "paper", "scissors"];

  let index = 0;
  let dynamicCircleType = circleTypes[index];
  const CIRCLE_TYPE_ANIMATION_TIME = 150;

  const loadDynamicCircleType = () => {
    dynamicCircleType = circleTypes[index++];

    if (index >= circleTypes.length) index = 0;

    isLoading && setTimeout(loadDynamicCircleType, CIRCLE_TYPE_ANIMATION_TIME);
  };

  isLoading && loadDynamicCircleType();
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
  {#if isLoading}
    <Circle type={dynamicCircleType} isVersus={true} />
  {:else}
    <Circle type={circlePickedType} isVersus={true} isWinner={winner} />
  {/if}
</div>

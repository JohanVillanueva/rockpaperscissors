<script>
  import { getContext } from "svelte";
  import Circle from "./Circle.svelte";

  export let playerInfo;
  export let isLoading = false;

  const circleTypes = getContext("circleTypes");
  const CIRCLE_TYPE_ANIMATION_TIME = 100;

  let index = 0;
  let dynamicCircleType = circleTypes[index];

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
    margin-bottom: 10px;
    font-size: 1.3em;
    letter-spacing: 2px;
  }
  .picker__score {
    text-transform: uppercase;
    margin-bottom: 40px;
    font-size: 1.5em;
    letter-spacing: 2px;
  }
  @media screen and (max-width: 768px) {
    .picker {
      flex-direction: column-reverse;
    }
    .player_info {
      margin-bottom: 0;
      margin-top: 40px;
      flex-direction: column;
    }
    .picker__name {
      margin-bottom: 10px;
    }
    .picker__score {
      margin-bottom: 10px;
    }
  }
</style>

<div class="picker">
  <div class="player_info">
    <div class="picker__name">{playerInfo.name}</div>
    <div class="picker__score">{playerInfo.score}</div>
  </div>
  {#if isLoading}
    <Circle type={dynamicCircleType} isVersus={true} />
  {:else}
    <Circle
      type={playerInfo.typePicked}
      isVersus={true}
      isWinner={playerInfo.isWinner} />
  {/if}
</div>

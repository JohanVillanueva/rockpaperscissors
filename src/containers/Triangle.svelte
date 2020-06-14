<script>
  import { getContext } from "svelte";
  import Timer from "./../components/Timer.svelte";
  import { game, currentPlayerInfo } from "../store";
  import Circle from "./../components/Circle.svelte";
  import { socketService, GAME_EVENTS, gameInfoService } from "../services";

  const DURATION = 10;
  let types = getContext("circleTypes");

  const circleSelected = circleType => {
    game.setTypePicked(
      circleType,
      $game.players.host.id !== $currentPlayerInfo.id
    );
    const playerInfo = $currentPlayerInfo;

    socketService.emit(GAME_EVENTS.USER_PICKED, {
      ...playerInfo,
      room: $game.id
    });
  };

  const handleTimeOut = () => {
    circleSelected(types[getRandomInt(0, types.length)]);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
</script>

<style>
  .triangle {
    background-image: url("../assets/images/bg-triangle.svg");
    background-size: var(--triangle-width) var(--triangle-height);
    background-repeat: no-repeat;
    background-position: center;
    height: var(--triangle-height);
    width: var(--triangle-width);
    position: relative;
    animation: scaleFadeIn 0.3s ease-out;
  }

  @keyframes scaleFadeIn {
    from {
      opacity: 0;
      transform: scale(0.2);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .triangle__item {
    position: absolute;
    transform-origin: 0;
    --circle-radio: calc(var(--circle-size) / 2);
  }
  .triangle__timer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 72px;
    box-sizing: border-box;
  }

  .triangle__item:first-child,
  .triangle__item:nth-child(2) {
    top: calc(var(--circle-radio) * -1);
  }

  .triangle__item:first-child {
    left: calc(var(--circle-radio) * -1);
  }
  .triangle__item:nth-child(2) {
    right: calc(var(--circle-radio) * -1);
  }
  .triangle__item:nth-child(3) {
    bottom: calc(var(--circle-radio) * -1);
    right: calc(50% - var(--circle-radio));
  }
</style>

<div class="triangle">
  {#each types as type, i}
    <div
      class="triangle__item"
      on:click|stopPropagation={() => circleSelected(type)}>
      <Circle {type} />
    </div>
  {/each}
  <div class="triangle__timer">
    <Timer seconds={DURATION} on:timeOut={() => handleTimeOut()} />
  </div>

</div>

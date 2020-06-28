<script>
  import { setContext, onDestroy } from "svelte";
  import { game, currentPlayerInfo } from "../store";
  import { socketService, GAME_EVENTS, gameInfoService } from "../services";
  import Versus from "./Versus.svelte";
  import Triangle from "./Triangle.svelte";

  setContext("circleTypes", ["rock", "paper", "scissors"]);

  let playerCirclePickedType;

  const handleTrianglePicked = circlePickedType => {
    playerCirclePickedType = circlePickedType;
  };

  const handlePlayAgain = () => {
    playerCirclePickedType = null;
  };
</script>

<style>
  .game {
    width: 100%;
    height: calc(var(--circle-size) * 2.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 15px;
    text-align: center;
  }
</style>

<div class="game">
  {#if $currentPlayerInfo.typePicked && false}
    <Versus on:playAgain={() => handlePlayAgain()} />
  {:else}
    <Triangle />
  {/if}
</div>

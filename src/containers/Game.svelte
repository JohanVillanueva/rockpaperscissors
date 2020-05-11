<script>
  import { setContext } from "svelte";
  import { game } from "../@store";
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
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    text-align: center;
  }
</style>

<div class="game">
  {#if $game.players.host.typePicked}
    <Versus on:playAgain={() => handlePlayAgain()} />
  {:else}
    <Triangle />
  {/if}
</div>

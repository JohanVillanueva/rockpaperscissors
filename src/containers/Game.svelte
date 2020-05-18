<script>
  import { setContext } from "svelte";
  import { game } from "../@store";
  import Versus from "./Versus.svelte";
  import Triangle from "./Triangle.svelte";
  import * as io from "socket.io-client";

  let playerCirclePickedType;
  let room;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  room = urlParams.get("room").toString();

  let socket = io.connect("http://localhost:8080", { forceNew: true });
  socket.emit("join_room", room);

  setContext("circleTypes", ["rock", "paper", "scissors"]);
  setContext("socket", socket);

  game.setRoom(room);
  game.setId();

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

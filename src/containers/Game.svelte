<script>
  import { setContext, onDestroy } from "svelte";
  import { game } from "../@store";
  import Versus from "./Versus.svelte";
  import Triangle from "./Triangle.svelte";
  import * as io from "socket.io-client";

  let playerCirclePickedType;
  let room;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  room = urlParams.get("room").toString();

  game.setRoom(room);
  game.setId();

  let socket = io.connect("http://localhost:8080", { forceNew: true });
  socket.on("joinRoomResponse", function(data) {
    const { code, message } = data;
    if (code === "ERROR") {
      alert(message);
    }
  });

  socket.on("gameReady", function(data) {
    console.log(data);
  });

  socket.emit("joinRoom", $game.players.host);

  setContext("circleTypes", ["rock", "paper", "scissors"]);
  setContext("socket", socket);

  const handleTrianglePicked = circlePickedType => {
    playerCirclePickedType = circlePickedType;
  };

  const handlePlayAgain = () => {
    playerCirclePickedType = null;
  };

  window.onbeforeunload = function() {
    socket.emit("exitGame", $game.players.host);
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

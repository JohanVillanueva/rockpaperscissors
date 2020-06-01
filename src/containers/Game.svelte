<script>
  import { setContext, onDestroy } from "svelte";
  import { game } from "../store";
  import { socketService, GAME_EVENTS } from "../services";
  import Versus from "./Versus.svelte";
  import Triangle from "./Triangle.svelte";

  let playerCirclePickedType;
  let room;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  room = urlParams.get("room") && urlParams.get("room").toString();

  game.setRoom(room);
  game.setId();

  socketService.socket.on(GAME_EVENTS.VERIFY_ROOM_AVAILABILITY, data => {
    // REFACTOR: check room availability
    const { code, message } = data;
    if (code === "ERROR") {
      alert(message);
    }
  });

  socketService.socket.on(GAME_EVENTS.GAME_IS_READY, data => {
    // REFACTOR: start the game
  });

  socketService.emit(GAME_EVENTS.JOIN_ROOM, $game.players.host);

  setContext("circleTypes", ["rock", "paper", "scissors"]);

  const handleTrianglePicked = circlePickedType => {
    playerCirclePickedType = circlePickedType;
  };

  const handlePlayAgain = () => {
    playerCirclePickedType = null;
  };

  window.onbeforeunload = function() {
    socketService.emit(GAME_EVENTS.EXIT_GAME, $game.players.host);
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

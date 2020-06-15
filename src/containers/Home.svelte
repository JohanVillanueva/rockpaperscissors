<script>
  import { socketService, GAME_EVENTS, gameInfoService } from "./../services";
  import Link from "./../components/Link.svelte";
  import { game } from "./../store";

  const WAITING_MODE = "waiting";
  const CREATION_MODE = "create";
  const JOIN_ROOM = "join_room";

  let mode;
  let nickname = "";
  let loading = false;
  let invitationLink = "";
  const isHost = gameInfoService.isHost;

  const createRoom = () => {
    loading = true;
    socketService.emit(GAME_EVENTS.CREATE_ROOM, nickname);
  };

  const joinRoom = () => {
    loading = true;
    socketService.emit(GAME_EVENTS.JOIN_ROOM, {
      name: nickname,
      roomId: gameInfoService.roomId
    });
  };

  const initialize = () => {
    if (!isHost) {
      mode = JOIN_ROOM;
      verifyRoomAvailability();
    } else {
      mode = CREATION_MODE;
      listenRoomCreatedEvent();
    }
  };

  const verifyRoomAvailability = () => {
    listenVerifyRoomAvailabilityResult();
    socketService.emit(
      GAME_EVENTS.VERIFY_ROOM_AVAILABILITY,
      gameInfoService.roomId
    );
  };

  const listenRoomCreatedEvent = () => {
    // response: { error: "", data: { hostId: string, roomId: string } }
    socketService.socket.on(GAME_EVENTS.ROOM_CREATED, response => {
      if (response.error) {
        gameInfoService.notifyError(response.error);
        mode = CREATION_MODE;
      } else {
        const { hostId, roomId } = response.data;
        game.setRoom(roomId);
        game.setId(hostId, nickname);
        invitationLink = gameInfoService.getInvitationLink(roomId);
        mode = WAITING_MODE;
      }
    });
  };

  const listenVerifyRoomAvailabilityResult = () => {
    // response: { error: "" }
    socketService.socket.on(
      GAME_EVENTS.VERIFY_ROOM_AVAILABILITY_RESULT,
      response => {
        if (response.error) {
          gameInfoService.notifyError(response.error);
          setTimeout(() => {
            gameInfoService.goHome();
          }, 3000);
        } else {
          mode = JOIN_ROOM;
          game.setRoom(gameInfoService.roomId);
        }
      }
    );
  };

  initialize();
</script>

<style>
  .home {
    margin: 0 auto;
    border: 1px solid var(--borders-color);
    padding: 50px;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 90px;
    display: block;
    text-align: center;
    margin-top: 25px;
  }

  .home__form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  .home__form__input {
    margin-right: 25px;
    width: 30%;
  }
  .home__form__button {
    width: 30%;
  }
  @media (max-width: 600px) {
    .home {
      flex-direction: column;
      padding: 50px 25px;
    }
    .home__form__input {
      margin-right: 0;
      margin-bottom: 25px;
      text-align: center;
      width: 100%;
    }
    .home__form__button {
      width: 100%;
    }

    .home__form__input,
    .home__form__button {
      max-width: 280px;
    }
  }
</style>

<div class="home">
  <div class="home__form">
    <input
      type="text"
      name="username"
      placeholder="Nickname"
      maxlength="15"
      autocomplete="off"
      bind:value={nickname}
      class="home__form__input"
      class:disabled={loading} />

    {#if mode === CREATION_MODE}
      <button
        class="btn btn--large home__form__button"
        disabled={loading || !nickname}
        on:click={() => createRoom()}>
        {#if loading}Creating...{:else}Create room{/if}
      </button>
    {:else if mode === JOIN_ROOM}
      <button
        class="btn btn--large home__form__button"
        disabled={loading || !nickname}
        on:click={() => joinRoom()}>
        {#if loading}Joining...{:else}Join{/if}
      </button>
    {:else if mode === WAITING_MODE}
      <button class="btn btn--large home__form__button" disabled={true}>
        Waiting...
      </button>
    {/if}

  </div>

  {#if mode === WAITING_MODE && isHost && invitationLink}
    <Link gameInvitationLink={invitationLink} />
  {/if}

</div>

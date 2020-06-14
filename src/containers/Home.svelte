<script>
  import { socketService, GAME_EVENTS, gameInfoService } from "./../services";
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
      if (socketService.verifyError(response)) {
        // TODO: Error handler
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
        if (socketService.verifyError(response)) {
          // TODO: Error handler
          mode = CREATION_MODE;
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

  .home__invitation__title {
    color: white;
    margin-bottom: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .home__invitation {
    margin-top: 35px;
    margin-left: auto;
    margin-right: auto;
  }
  .home__invitation__share {
    display: flex;
  }

  .home__invitation__share span {
    padding: 10px;
    font-size: 12px;
    color: var(--circle-background);
    width: 85%;
    border: 2px solid var(--borders-color);
    border-right: 0;
  }
  .home__invitation__share .btn {
    min-width: auto;
    padding: 12px 15px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: white;
    background: var(--paper-gradient);
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
    .home__invitation,
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
      class="home__form__input" />

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
    <div class="home__invitation">
      <div class="home__invitation__title">Invite your friends</div>
      <div class="home__invitation__share">
        <span>{invitationLink}</span>
        <button class="btn">COPY</button>
      </div>
    </div>
  {/if}

</div>

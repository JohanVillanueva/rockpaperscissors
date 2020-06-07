<script>
  import Link from "./../components/Link.svelte";
  import { socketService, GAME_EVENTS } from "./../services";
  import { game } from "./../store";
  import { createEventDispatcher } from "svelte";

  const WAITING_MODE = "waiting";
  const CREATION_MODE = "create";
  const READY_TO_PLAY_MODE = "ready";

  let mode = CREATION_MODE;
  let nickname = "";
  let loading = false;
  let gameInvitationLink = "https://rps/sdd3c";

  const dispatch = createEventDispatcher();

  const createRoom = () => {
    loading = true;
    socketService.emit(GAME_EVENTS.CREATE_ROOM, nickname);
  };

  socketService.socket.on(GAME_EVENTS.ROOM_CREATED, data => {
    // TODO: Remove logs. Only for debug
    if (socketService.verifyError(data)) {
      mode = CREATION_MODE;
    } else {
      mode = WAITING_MODE;
    }
  });
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
      class="home__form__input" />

    {#if mode === CREATION_MODE}
      <button
        class="btn btn--large home__form__button"
        disabled={loading || !nickname}
        on:click={() => createRoom()}>
        {#if loading}Creating...{:else}Create room{/if}
      </button>
    {:else if mode === WAITING_MODE}
      <button class="btn btn--large home__form__button" disabled={true}>
        Waiting...
      </button>
    {/if}

  </div>

  {#if mode === WAITING_MODE}
    <!-- <div class="home__invitation">
      <div class="home__invitation__title">Invite your friends</div>
      <div class="home__invitation__share">
        <span>{gameInvitationLink}</span>
        <button class="btn">COPY</button>
      </div>
    </div> -->
    <Link />
  {/if}

</div>

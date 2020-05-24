<script>
  const WAITING_MODE = "waiting";
  const CREATION_MODE = "create";
  const READY_TO_PLAY_MODE = "ready";

  let mode = CREATION_MODE;
  let loading = false;
  let gameInvitationLink = "https://rps/sdd3c";

  const createRoom = () => {
    loading = true;
    setTimeout(() => {
      loading = false;
      mode = WAITING_MODE;
      setTimeout(() => {
        mode = READY_TO_PLAY_MODE;
      }, 3000);
    }, 3000);
  };
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
      class="home__form__input" />

    {#if mode === CREATION_MODE}
      <button
        class="btn btn--large home__form__button"
        disabled={loading}
        on:click={() => createRoom()}>
        {#if loading}Creating...{:else}Create room{/if}
      </button>
    {:else}
      <button class="btn btn--large home__form__button">
        {#if mode === WAITING_MODE}Waiting...{:else}Play!{/if}
      </button>
    {/if}

  </div>

  {#if mode === WAITING_MODE}
    <div class="home__invitation">
      <div class="home__invitation__title">Invite your friends</div>
      <div class="home__invitation__share">
        <span>{gameInvitationLink}</span>
        <button class="btn">COPY</button>
      </div>
    </div>
  {/if}

</div>

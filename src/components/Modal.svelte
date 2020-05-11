<script>
  import { createEventDispatcher } from "svelte";

  export let isOpen;

  const dispatch = createEventDispatcher();

  const handleCloseModal = () => {
    dispatch("close");
  };
</script>

<style>
  .overlay {
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
  }

  .modal {
    background: white;
    max-width: 600px;
    border-radius: 10px;
    padding: 20px 50px;
    position: absolute;
    z-index: 1000;
    display: none;
    box-sizing: border-box;
    animation: slideFadeIn 0.2s ease-in;
  }

  .open {
    display: unset;
  }

  @keyframes slideFadeIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    margin: 10px 0 35px;
  }

  .modal__header__title {
    color: var(--borders-color);
    margin: 0;
    font-size: 2.4em;
  }

  .close-btn {
    margin-top: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in;
  }

  .close-btn:active {
    transform: scale(0.8);
  }

  .modal__body {
    margin: 30px 0 20px;
  }

  .modal__body .close-btn {
    display: none;
  }

  .link__room {
    font-size: 1.5em;
  }

  @media screen and (max-width: 480px) {
    .modal.open {
      width: 100%;
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }

    .modal__header {
      justify-content: center;
      margin-top: 40px;
    }

    .modal__header .close-btn {
      display: none;
    }

    .modal__body {
      display: flex;
      max-height: 100%;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 60%;
    }

    .modal__body .close-btn {
      display: block;
    }
  }
</style>

<div class="overlay" class:open={isOpen} />
<div class="modal" class:open={isOpen}>
  <div class="modal__header">
    <h2 class="modal__header__title">invite</h2>
    <span class="close-btn" on:click={handleCloseModal}>
      <img src="assets/images/icon-close.svg" alt="X close" />
    </span>
  </div>
  <div class="modal__body">
    <span class="link__room">https://rpsgame/12321</span>
    <span class="close-btn" on:click={handleCloseModal}>
      <img src="assets/images/icon-close.svg" alt="X close" />
    </span>
  </div>
</div>

<script>
  export let type;
  export let isVersus = false;
  export let isWinner = false;
</script>

<style>
  .circle {
    position: relative;
    overflow: visible;
    border-radius: 50%;
    width: var(--circle-size);
    height: var(--circle-size);
    padding: var(--circle-border-width);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s ease-in;
    user-select: none;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .circle.versus {
    width: calc(var(--circle-size) * 1.2);
    height: calc(var(--circle-size) * 1.2);
    cursor: default;
  }

  .circle:not(.versus):hover {
    transform: scale(1.03);
  }

  .circle:not(.versus):active {
    transform: scale(0.95);
  }

  .circle.paper {
    box-shadow: 0px 5px 0px -1px #2945c0;
    background: var(--paper-gradient);
  }

  .circle.rock {
    box-shadow: 0px 5px 0px -1px #961734;
    background: var(--rock-gradient);
  }

  .circle.scissors {
    box-shadow: 0px 5px 0px -1px #c66c1d;
    background: var(--scissors-gradient);
  }

  .circle .circle__image-wrapper {
    background: var(--circle-background);
    border-radius: 50%;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: inset 0px 4px 0px 0px #bac0d7;
  }

  .circle .circle__image-wrapper .image {
    opacity: 0.9;
    height: 48%;
  }
  .circle.paper .circle__image-wrapper .image {
    height: 15%;
  }
  .circle.scissors .circle__image-wrapper .image {
    height: 45%;
  }

  .wave {
    position: absolute;
    z-index: -1;
    background: white;
    border-radius: 50%;
    height: 200%;
    width: 200%;
    opacity: 0;
    transform: scale(0.5);
    animation: scaleIn 2.1s infinite ease-out;
  }
  .wave:first-child {
    opacity: 0.15;
  }
  .wave:nth-child(2) {
    opacity: 0.09;
    animation-delay: 0.7s;
  }
  .wave:nth-child(3) {
    opacity: 0.06;
    animation-delay: 1.4s;
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.5);
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>

<div class="circle {type}" class:versus={isVersus}>
  {#if isWinner}
    <div class="wave" />
    <div class="wave" />
    <div class="wave" />
  {/if}
  <div class="circle__image-wrapper">
    <img
      class="image"
      src={`assets/images/icon-${type}.svg`}
      alt={type}
      draggable="false" />
  </div>
</div>

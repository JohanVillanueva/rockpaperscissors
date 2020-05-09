<script>
  import Circle from "./../components/Circle.svelte";

  let items = [
    {
      icon: "assets/images/icon-paper.svg",
      type: "paper"
    },
    {
      icon: "assets/images/icon-scissors.svg",
      type: "scissors"
    },
    {
      icon: "assets/images/icon-rock.svg",
      type: "rock"
    }
  ];
</script>

<style>
  .triangle {
    background-image: url("../assets/images/bg-triangle.svg");
    background-size: var(--triangle-width) var(--triangle-height);
    background-repeat: no-repeat;
    background-position: center;
    height: var(--triangle-height);
    width: var(--triangle-width);
    position: relative;
    animation: scaleFadeIn 0.3s ease-out;
  }

  @keyframes scaleFadeIn {
    from {
      opacity: 0;
      transform: scale(0.2);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .triangle__item {
    position: absolute;
    transform-origin: 0;
    --circle-radio: calc(var(--circle-size) / 2);
  }

  .triangle__item:first-child,
  .triangle__item:nth-child(2) {
    top: calc(var(--circle-radio) * -1);
  }

  .triangle__item:first-child {
    left: calc(var(--circle-radio) * -1);
  }
  .triangle__item:nth-child(2) {
    right: calc(var(--circle-radio) * -1);
  }
  .triangle__item:nth-child(3) {
    bottom: calc(var(--circle-radio) * -1);
    right: calc(50% - var(--circle-radio));
  }
</style>

<div class="triangle">
  {#each items as item, i}
    <div class="triangle__item">
      <Circle {...item} />
    </div>
  {/each}
</div>

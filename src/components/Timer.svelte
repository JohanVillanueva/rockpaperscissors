<script>
  import { createEventDispatcher, onDestroy } from "svelte";

  export let seconds = 0;
  export let timerInterval = null;
  const dispatch = createEventDispatcher();

  const timeOut = () => {
    dispatch("timeOut");
  };
  function removeinterval() {
    clearInterval(timerInterval);
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        removeinterval();
        timeOut();
      }
    }, 1000);
  }
  startTimer();
  onDestroy(() => {
    removeinterval();
  });
</script>

<style>
  .timer {
    font-size: 48px;
    color: white;
    animation: scaleup 0.5s alternate infinite ease-in;
    transform-origin: 50% 50%;
  }
  @keyframes scaleup {
    0% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

{#if seconds <= 5}
  <span class="timer">{seconds}</span>
{/if}

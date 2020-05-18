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
  }
</style>

<span class="timer">{seconds}</span>

<script>
  import Versus from "./Versus.svelte";
  import Triangle from "./Triangle.svelte";
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
  <Triangle />
  <!-- <Versus /> -->
</div>

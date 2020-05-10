<script>
  import Versus from "./Versus.svelte";
  import Triangle from "./Triangle.svelte";

  let playerCirclePickedType;

  const handleTrianglePicked = circlePickedType => {
    playerCirclePickedType = circlePickedType;
  };
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
  {#if playerCirclePickedType}
    <Versus circlePickedType={playerCirclePickedType} />
  {:else}
    <Triangle on:picked={({ detail }) => handleTrianglePicked(detail)} />
  {/if}
</div>

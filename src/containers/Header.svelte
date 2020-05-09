<script>
  import Score from "./../components/Score.svelte";
</script>

<style>
  .header {
    border-radius: 10px;
    border: 2px solid var(--borders-color);
    padding: 15px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    width: 100%;
    font-size: 16px;
  }

  .header__logo img {
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    .header {
      font-size: 12px;
      /* height: 120px; */
    }
  }
  @media screen and (max-width: 480px) {
    .header .header__logo {
      height: 80%;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
</style>

<div class="header">
  <div class="header__logo">
    <img src="assets/images/logo.svg" alt="Logo" />
  </div>
  <Score />
</div>

<style>
  .header {
    padding: 15px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    width: 100%;
    font-size: 16px;
    text-align: center;
  }

  .header__logo img {
    height: 100%;
    text-align: center;
  }

  .header__logo__tagline {
    color: #ffbebe;
    letter-spacing: 2px;
    margin-top: 5px;
    text-transform: uppercase;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    .header {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 480px) {
    .header .header__logo {
      height: 65%;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
</style>

<div class="header">
  <div class="header__logo">
    <img src="assets/images/logo.svg" alt="Rock, paper, scissors!" />
    <div class="header__logo__tagline">Rock, paper, scissors!</div>
  </div>
</div>

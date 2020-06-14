<script>
  import * as clipboardy from "clipboardy";
  import { alertService } from "./../services";

  export let gameInvitationLink = "";

  const INVITATION_LINK = "Invitation link  was copied to clipboard";

  const copylink = gameInvitationLink => {
    clipboardy
      .write(gameInvitationLink)
      .then(data => alertService.showInfo(INVITATION_LINK));
  };
</script>

<style>
  .home__invitation {
    max-width: 280px;
  }
  .home__invitation__share .btn {
    min-width: auto;
    padding: 12px 15px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    color: white;
    background: var(--paper-gradient);
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

  .home__invitation__title {
    color: white;
    margin-bottom: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

<div class="home__invitation">
  <div class="home__invitation__title">Invite your friends</div>
  <div class="home__invitation__share">
    <span class="link">{gameInvitationLink}</span>
    <button class="btn" on:click={() => copylink(gameInvitationLink)}>
      COPY
    </button>
  </div>

</div>

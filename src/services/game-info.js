const QUERY_PARAMETER_ROOM_NAME = "room";

class GameInfoService {
  constructor() {
    this.verifyRoomId();
    this.getCurrentAppUrl();
  }

  getCurrentAppUrl() {
    this.currentUrl = window.location.href;
  }

  verifyRoomId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.roomId = urlParams.get(QUERY_PARAMETER_ROOM_NAME);
    this.isHost = !this.roomId;
  }

  getInvitationLink(roomId) {
    const invitationLink = `${this.currentUrl}?${QUERY_PARAMETER_ROOM_NAME}=${roomId}`;
    return invitationLink;
  }
}

export const gameInfoService = new GameInfoService();

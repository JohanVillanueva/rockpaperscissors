import * as io from "socket.io-client";

const BASE_API = "https://rock-paper-scissors-gamer.herokuapp.com/";

export const GAME_EVENTS = {
  CREATE_ROOM: "CREATE_ROOM",
  ROOM_CREATED: "ROOM_CREATED",
  VERIFY_ROOM_AVAILABILITY: "VERIFY_ROOM_AVAILABILITY",
  VERIFY_ROOM_AVAILABILITY_RESULT: "VERIFY_ROOM_AVAILABILITY_RESULT",
  JOIN_ROOM: "JOIN_ROOM",
  GAME_IS_READY: "GAME_IS_READY",
  USER_PICKED: "USER_PICKED",
  GAME_RESULT: "GAME_RESULT",
  PLAY_AGAIN_REQUEST: "PLAY_AGAIN_REQUEST",
  PLAY_AGAIN: "PLAY_AGAIN",
  KICK_PLAYER: "KICK_PLAYER",
  EXIT_GAME: "EXIT_GAME",
};

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io.connect(BASE_API, { forceNew: true });
  }

  disconnect() {
    this.socket && this.socket.disconnect();
  }

  emit(event, data = null) {
    this.socket && this.socket.emit(event, data);
  }

  off(event) {
    this.socket && this.socket.off(event);
  }

  verifyError(data) {
    return !!data.error;
  }
}

export const socketService = new SocketService();

import * as io from "socket.io-client";

const BASE_API = "http://localhost:8080";

export const GAME_EVENTS = {
  GAME_IS_READY: "gameReady",
  PLAY_AGAIN: "playAgain",
  VERIFY_ROOM_AVAILABILITY: "joinRoomResponse",
  EXIT_GAME: "exitGame",
  USER_PICKED: "circleSelected",
  GAME_RESULT_READY: "circleSelectedResponse",
  JOIN_ROOM: "joinRoom",
};

class SocketService {
  constructor() {
    this.socket = null;
    console.log("socket service is created");
  }

  connect() {
    console.log("socket connect");
    this.socket = io.connect(BASE_API, { forceNew: true });
  }

  disconnect() {
    console.log("socket disconnect");
    this.socket && this.socket.disconnect();
  }

  emit(event, data = null) {
    console.log("socket event emitted ", event);
    this.socket && this.socket.emit(event, data);
  }

  off(event) {
    console.log("socket event off ", event);
    this.socket && this.socket.off(event);
  }
}

export const socketService = new SocketService();

import { writable } from "svelte/store";

const INITIAL_GAME_STATE = {
  id: "",
  players: {
    host: {
      id: 0,
      name: "",
      score: 0,
      typePicked: "",
      isWinner: false,
      room: "0",
    },
    opponent: {
      id: 0,
      name: "",
      score: 0,
      typePicked: "",
      isWinner: false,
      room: "0",
    },
  },
};

function getRandomId() {
  return Math.floor(Math.random() * 10000) + 1;
}

function createGameStore() {
  const { subscribe, set, update } = writable(INITIAL_GAME_STATE);

  return {
    subscribe,
    incrementScore: (isOpponent = false) =>
      update((game) => {
        let { opponent, host } = game.players;
        if (isOpponent) {
          opponent = {
            ...opponent,
            score: opponent.score + 1,
          };
        } else {
          host = {
            ...host,
            score: host.score + 1,
          };
        }
        return {
          ...game,
          players: {
            host,
            opponent,
          },
        };
      }),
    setId: (isOpponent = false) =>
      update((game) => {
        let { opponent, host } = game.players;
        if (isOpponent) {
          opponent = {
            ...opponent,
            id: getRandomId(),
          };
        } else {
          host = {
            ...host,
            id: getRandomId(),
          };
        }
        return {
          ...game,
          players: {
            host,
            opponent,
          },
        };
      }),
    setRoom: (room, isOpponent = false) =>
      update((game) => {
        let { opponent, host } = game.players;
        if (isOpponent) {
          opponent = {
            ...opponent,
            room: room,
          };
        } else {
          host = {
            ...host,
            room: room,
          };
        }
        return {
          ...game,
          players: {
            host,
            opponent,
          },
        };
      }),
    setTypePicked: (typePicked, isOpponent = false) =>
      update((game) => {
        let { opponent, host } = game.players;
        if (isOpponent) {
          opponent = {
            ...opponent,
            typePicked,
          };
        } else {
          host = {
            ...host,
            typePicked,
          };
        }
        return {
          ...game,
          players: {
            host,
            opponent,
          },
        };
      }),
    setWinner: (isOpponent = false) =>
      update((game) => {
        let { opponent, host } = game.players;
        if (isOpponent) {
          opponent = {
            ...opponent,
            isWinner: true,
          };
          host = {
            ...host,
            isWinner: false,
          };
        } else {
          opponent = {
            ...opponent,
            isWinner: false,
          };
          host = {
            ...host,
            isWinner: true,
          };
        }
        return {
          ...game,
          players: {
            host,
            opponent,
          },
        };
      }),
    playAgain: () =>
      update((game) => ({
        ...game,
        players: {
          ...game.players,
          host: {
            ...game.players.host,
            typePicked: "",
            isWinner: false,
          },
          opponent: {
            ...game.players.opponent,
            typePicked: "",
            isWinner: false,
          },
        },
      })),
    reset: () => set(INITIAL_GAME_STATE),
  };
}
export const game = createGameStore();

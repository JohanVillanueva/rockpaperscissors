import { writable, derived } from "svelte/store";
import { gameInfoService } from "../services";

const INITIAL_GAME_STATE = {
  id: "",
  players: {
    host: {
      id: 0,
      name: "",
      score: 0,
      typePicked: "",
      isWinner: false,
    },
    opponent: {
      id: 0,
      name: "",
      score: 0,
      typePicked: "",
      isWinner: false,
    },
  },
};

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
    setId: (id, name, isOpponent = false) =>
      update((game) => {
        let { opponent, host } = game.players;
        if (isOpponent) {
          opponent = {
            ...opponent,
            id,
            name: name.toUpperCase(),
          };
        } else {
          host = {
            ...host,
            id,
            name: name.toUpperCase(),
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
    setRoom: (id) =>
      update((game) => {
        return {
          ...game,
          id,
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

export const currentPlayerInfo = derived(game, ({ players }) =>
  gameInfoService.isHost ? players.host : players.opponent
);

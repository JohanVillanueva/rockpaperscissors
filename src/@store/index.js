import { writable } from "svelte/store";

const INITIAL_GAME_STATE = {
  id: "",
  players: {
    host: {
      id: "",
      name: "Johan",
      score: 0,
      typePicked: "",
      isWinner: false,
    },
    opponent: {
      id: "",
      name: "Cristhian",
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
            score: opponent.host + 1,
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
          },
          opponent: {
            ...game.players.opponent,
            typePicked: "",
          },
        },
      })),
    reset: () => set(INITIAL_GAME_STATE),
  };
}
export const game = createGameStore();

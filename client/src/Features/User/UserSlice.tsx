import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";
import { UserResults, Game } from "../../interfaces";

const user = createSlice({
  name: "user",
  initialState: {
    user: {
      opponent: {
        name: "",
        image: "",
      },
      _id: undefined,
      name: "",
      email: "",
      image: "",
      groups: [],
      winningTeam: "",
      bestScorer: "",
      results: {
        games: [],
      },
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTeam: (state, action) => {
      state.user.winningTeam = action.payload;
    },
    setPlayer: (state, action) => {
      state.user.bestScorer = action.payload;
    },
    setRandomGame: (state, action) => {
      state.user.results.games = action.payload;
    },
    setOpponent: (state, action) => {
      state.user.opponent = action.payload;
    },
    setGames: (state, action) => {
      const gamesDuplicate: any = state.user.results.games;
      console.log(gamesDuplicate);
      gamesDuplicate[action.payload.index][action.payload.name].score =
        action.payload.value;
      state.user.results.games = gamesDuplicate;
    },
  },
});

export const {
  setUser,
  setGames,
  setTeam,
  setPlayer,
  setRandomGame,
  setOpponent,
} = user.actions;
export default user.reducer;

export const reduxSetUser = (user: UserResults) => async (
  dispatch: AppDispatch
) => {
  localStorage.setItem("user_id", user._id);
  await dispatch(setUser(user));
};
export const reduxSetTeam = (winningTeam: string) => async (
  dispatch: AppDispatch
) => {
  await dispatch(setTeam(winningTeam));
};
export const reduxSetPlayer = (bestScorer: string) => async (
  dispatch: AppDispatch
) => {
  await dispatch(setPlayer(bestScorer));
};

export const ResuxSetRandomGame = (games: Game[]) => async (
  dispatch: AppDispatch
) => {
  await dispatch(setRandomGame(games));
};
export const reduxSetUserGames = (
  index: number,
  name: string,
  value: string
) => async (dispatch: AppDispatch) => {
  let payload = { index, name, value };
  await dispatch(setGames(payload));
};
export const reduxSetOpponent = (name: string, image: string) => async (
  dispatch: AppDispatch
) => {
  let payload = { name, image };

  await dispatch(setOpponent(payload));
};

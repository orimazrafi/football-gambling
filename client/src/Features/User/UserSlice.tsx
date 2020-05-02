import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";

const user = createSlice({
  name: "user",
  initialState: {
    user: {
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
    setGames: (state, action) => {
      let gamesDuplicate: any = state.user.results.games;
      gamesDuplicate[action.payload.index][action.payload.name].score =
        action.payload.value;
      state.user.results.games = gamesDuplicate;
    },
  },
});

export const { setUser, setGames, setTeam, setPlayer } = user.actions;
export default user.reducer;

export const reduxSetUser = (user: any) => async (dispatch: AppDispatch) => {
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
export const reduxSetUserGames = (
  index: number,
  name: string,
  value: string
) => async (dispatch: AppDispatch) => {
  let payload = { index, name, value };
  await dispatch(setGames(payload));
};

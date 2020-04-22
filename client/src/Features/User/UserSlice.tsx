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
      results: {},
    },
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
  },
});

export const { setUser } = user.actions;
export default user.reducer;

export const reduxSetUser = (user: any) => async (dispatch: AppDispatch) => {
  localStorage.setItem("user_id", user._id);
  await dispatch(setUser(user));
};

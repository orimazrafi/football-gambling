import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../redux/store";

const group = createSlice({
  name: "group",
  initialState: {
    groups: [],
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroups } = group.actions;
export default group.reducer;

export const reduxSetGroup = (groups: any) => async (dispatch: AppDispatch) => {
  await dispatch(setGroups(groups));
};

export const reduxGetGroups = (groups: any) => async (
  dispatch: AppDispatch
) => {
  await dispatch(setGroups(groups));
};

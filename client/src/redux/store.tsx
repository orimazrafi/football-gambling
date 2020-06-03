import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Features/User/UserSlice";
import GroupSlice from "../Features/Group/GroupSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userSlice,
    group: GroupSlice,
  },
  middleware: [thunk],
});
export default store;
export type AppDispatch = typeof store.dispatch;

import { useCallback, useEffect } from "react";
import { reduxSetOpponent } from "../Features/User/UserSlice";
import { useDispatch } from "react-redux";

export const useSetInitialOpponent = (gambler: any, history: any) => {
  const dispatch = useDispatch();

  const setOpponent = useCallback(async () => {
    await dispatch(reduxSetOpponent(gambler.name, gambler.image));
  }, [dispatch, gambler]);
  useEffect(() => {
    setOpponent();
  }, [history, setOpponent]);
};

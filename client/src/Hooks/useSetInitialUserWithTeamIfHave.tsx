import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { reduxSetUser } from "../Features/User/UserSlice";

export const useSetInitialUserWithTeamIfHave = (data: any, user: any) => {
  const dispatch = useDispatch();

  const userHasWinningTeam = useCallback(() => user.winningTeam !== "", [
    user.winningTeam,
  ]);
  useEffect(() => {
    const setUser = async () => {
      await dispatch(reduxSetUser(data.getUser.user));
    };
    if (userHasWinningTeam()) return;
    if (data?.getUser?.success) {
      setUser();
    }
  }, [data, dispatch, userHasWinningTeam]);
  return {};
};

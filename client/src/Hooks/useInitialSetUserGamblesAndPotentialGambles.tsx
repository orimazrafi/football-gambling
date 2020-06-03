import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reduxSetUser } from "../Features/User/UserSlice";

export const useInitialSetUserGamblesAndPotentialGambles = (
  data: any,
  user: any
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setUser = async () => {
      await dispatch(reduxSetUser(data.getUser.user));
    };
    if (user.bestScorer !== "") return;
    if (data?.getUser?.success) {
      setUser();
    }
  }, [data, dispatch, user.bestScorer]);
};

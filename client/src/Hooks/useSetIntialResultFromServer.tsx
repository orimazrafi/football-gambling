import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { reduxSetUser } from "../Features/User/UserSlice";

export const useSetIntialResultFromServer = (user: any, data: any) => {
  const dispatch = useDispatch();
  const isResultInitial = useCallback(() => user?.results?.games?.length > 0, [
    user,
  ]);
  useEffect(() => {
    const setUser = async () => {
      await dispatch(reduxSetUser(data.getUser.user));
      toast.success(data.getUser.message);
    };
    if (isResultInitial()) return;
    if (data?.getUser?.success) {
      setUser();
    }
  }, [data, user?.results?.games?.length, dispatch, isResultInitial]);
};

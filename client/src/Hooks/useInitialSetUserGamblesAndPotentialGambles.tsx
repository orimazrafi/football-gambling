import { useEffect } from "react";
// import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";
import { useDispatch } from "react-redux";
import { reduxSetUser } from "../Features/User/UserSlice";
import { toast } from "react-toastify";

export const useInitialSetUserGamblesAndPotentialGambles = (
  data: any,
  user: any
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const setUser = async () => {
      await dispatch(reduxSetUser(data.getUser.user));
      toast.success(data.getUser.message);
    };
    if (user.bestScorer !== "") return;
    if (data?.getUser?.success) {
      setUser();
    }
  }, [data, dispatch, user.bestScorer]);
};

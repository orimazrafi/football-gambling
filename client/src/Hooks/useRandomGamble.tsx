import { UseAddRandomGamble } from "./UseAddRandomGamble";
import { ResuxSetRandomGame } from "../Features/User/UserSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export const useRandomGamble = (user: any) => {
  const dispatch = useDispatch();

  const addRandom = async (index: number) => {
    const [data] = await UseAddRandomGamble(user, index);
    if (data.addRandomGamble.success) {
      await dispatch(
        ResuxSetRandomGame(data.addRandomGamble.user.results.games)
      );
      return toast.success(data.addRandomGamble.message);
    }
    return toast.error(data.addRandomGamble.message);
  };
  return { addRandom };
};

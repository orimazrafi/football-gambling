import { useDispatch } from "react-redux";
import { reduxSetPlayer } from "../Features/User/UserSlice";
import { UseGambleMutation } from "./UseGambleMutation";
import { toast } from "react-toastify";

export const useSetWinningTeamGamble = (user: any) => {
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await dispatch(reduxSetPlayer(value));
  };

  const handleSave = async () => {
    const [data] = await UseGambleMutation(user);
    if (data.addGamble.success) {
      return toast.success(data.addGamble.message);
    }
    return toast.error(data.addGamble.message);
  };
  return { handleChange, handleSave };
};

import { reduxSetTeam } from "../Features/User/UserSlice";
import { useDispatch } from "react-redux";

export const useChangeWinningTeam = () => {
  const dispatch = useDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await dispatch(reduxSetTeam(value));
  };
  return { handleChange };
};

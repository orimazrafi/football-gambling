import { reduxSetUserGames } from "../Features/User/UserSlice";
import { useDispatch } from "react-redux";

const MINIMUM_GAMBLE_NUMBER = 0;
const MAXIMUM_GAMBLE_NUMBER = 10;
export const useSetMatchesGamble = () => {
  const dispatch = useDispatch();

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    if (
      parseInt(value) > MINIMUM_GAMBLE_NUMBER ||
      parseInt(value) < MAXIMUM_GAMBLE_NUMBER
    ) {
      await dispatch(reduxSetUserGames(index, name, value));
    }
  };
  return { handleChange };
};

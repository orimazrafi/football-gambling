import { reduxSetUserGames } from "../Features/User/UserSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const MINIMUM_GAMBLE_NUMBER = 0;
const MAXIMUM_GAMBLE_NUMBER = 10;
const HOME_TEAM = "homeTeam";
const AWAY_TEAM = "awayTeam";
export const useSetMatchesGamble = () => {
  const dispatch = useDispatch();
  const [autoFocus, setAutoFocus] = useState({ index: 0, name: "" });
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const notAString = () => {
      if (
        parseInt(value) > MINIMUM_GAMBLE_NUMBER ||
        parseInt(value) < MAXIMUM_GAMBLE_NUMBER ||
        value === ""
      )
        return true;
      else return false;
    };
    if (notAString()) {
      await dispatch(reduxSetUserGames(index, name, value));
    }
    if (value === "") {
      return setAutoFocus({ index, name });
    }
    if (name === HOME_TEAM) {
      return setAutoFocus({ index, name: AWAY_TEAM });
    }
    if (name === AWAY_TEAM) {
      return setAutoFocus({ index: ++index, name: HOME_TEAM });
    }
  };
  return { handleChange, autoFocus };
};

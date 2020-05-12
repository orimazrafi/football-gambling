import { useState } from "react";
import { GroupBlur } from "../interfaces";

export const useBlur = () => {
  const [blur, setBlur] = useState<GroupBlur>({
    name: false,
    passwordConfirm: false,
    league: false,
  });
  const handelNameBlur = () => {
    setBlur((prev: GroupBlur) => ({ ...prev, name: true }));
  };
  const handlePasswordConfirmBlur = () => {
    setBlur((prev: GroupBlur) => ({ ...prev, passwordConfirm: true }));
  };
  const handleLeagueBlur = () => {
    setBlur((prev: GroupBlur) => ({
      ...prev,
      league: true,
    }));
  };
  return { handelNameBlur, handlePasswordConfirmBlur, handleLeagueBlur, blur };
};

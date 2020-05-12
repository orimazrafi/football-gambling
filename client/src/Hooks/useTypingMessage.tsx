import { UseStopTyping } from "./UseStopTyping";
import { UseTyping } from "./UseTyping";
const EMPTY_MESSAGE = 0;

export const useTypingMessage = (setMessage: any, groupId: any) => {
  const handleChange = async (e: any) => {
    const { value } = e.target;
    setMessage(value);
    if (value.trim().length === EMPTY_MESSAGE) {
      return await UseStopTyping(groupId);
    }
    await UseTyping(groupId);
  };

  return { handleChange };
};

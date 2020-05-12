import { UseStopTyping } from "./UseStopTyping";
import { UseNewMessage } from "./UseNewMessage";

export const useMessageSubmit = (
  scrollEvent: any,
  setMessage: any,
  groupId: any,
  message: any
) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    await UseStopTyping(groupId);
    await UseNewMessage(groupId, message);
    scrollEvent();
  };
  return { handleSubmit };
};

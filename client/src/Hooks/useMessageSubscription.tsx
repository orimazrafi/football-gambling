import { useSubscription } from "react-apollo";
import { NEW_MESSAGE } from "../subscription";

export const useMessageSubscription = (groupId: string) => {
  const { data: newMessage } = useSubscription(NEW_MESSAGE, {
    variables: { groupId },
  });
  return newMessage;
};

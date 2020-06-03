import { USER_TYPING } from "../subscription";
import { useSubscription } from "react-apollo";

export const useCreateTypingFirstSubscription = (groupId: string) => {
  const { data: typingData, loading: loadingData } = useSubscription(
    USER_TYPING,
    {
      variables: { groupId, userId: localStorage.getItem("user_id") as string },
    }
  );
  return { typingData, loadingData };
};

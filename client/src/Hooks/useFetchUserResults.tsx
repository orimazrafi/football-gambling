import { FETCH_USER_RESULT } from "../queries";
import { userIdFromLocalStorage } from "../helpers";
import { useQuery } from "react-apollo";

export const useFetchUserResults = (userId: string) => {
  const { data, loading: loadingUserResults } = useQuery<
    any,
    Record<string, any>
  >(FETCH_USER_RESULT, {
    variables: {
      userId: userId || userIdFromLocalStorage(),
    },
  });
  return { data, loadingUserResults };
};

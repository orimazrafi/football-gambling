import { useQuery } from "react-apollo";
import { FETCH_USER_GROUP_LEAGUE_RESULTS } from "../queries";
import { userIdFromLocalStorage } from "../helpers";

export const useFetchUserGroupResults = (groupId: string) => {
  const {
    data,
    loading: loadingUserData,
  }: {
    data: {
      group: any;
    };
    loading: boolean;
  } = useQuery<any, Record<string, any>>(FETCH_USER_GROUP_LEAGUE_RESULTS, {
    variables: {
      groupId,
      userId: userIdFromLocalStorage(),
    },
  });
  return { data, loadingUserData };
};

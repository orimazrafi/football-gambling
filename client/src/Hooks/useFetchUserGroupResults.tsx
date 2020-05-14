import { useQuery } from "react-apollo";
import { FETCH_USER_GROUP_LEAGUE_RESULTS } from "../queries";

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
      userId: localStorage.getItem("user_id"),
    },
  });
  return { data, loadingUserData };
};

import { useQuery } from "react-apollo";
import { FETCH_LEAGUES } from "../queries";
interface Data {
  leagues: League[];
}
interface League {
  _id: string;
  name: string;
  label?: string;
}
export const useFetchLeaguesForSelectBox = () => {
  let { data, loading: loadingLeagues } = useQuery<
    Data,
    Record<string, boolean>
  >(FETCH_LEAGUES);

  return { data, loadingLeagues };
};

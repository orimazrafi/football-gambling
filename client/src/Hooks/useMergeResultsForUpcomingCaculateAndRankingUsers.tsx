import { useState, useCallback, useEffect } from "react";
import { UserScore, UserGames, UserResults } from "../interfaces";
import { UseCheckForGamble } from "./UseCheckForGamble";

export const useMergeResultsForUpcomingCaculateAndRankingUsers = (
  data: any,
  setLoadingScore: any
) => {
  const [userScore, setUserScore] = useState<UserScore[]>([]);
  const mergeGamble = useCallback(
    (users: UserGames[]) => {
      users.forEach((user: UserGames) => {
        const [userScore] = UseCheckForGamble(data, user, user.id);
        setUserScore((pre: UserScore[]) => [...pre, ...userScore]);
      });
    },
    [data]
  );
  useEffect(() => {
    setLoadingScore(true);
    let users: UserGames[] = [];
    data?.group?.users.forEach((user: UserResults) => {
      users.push({ games: user.results.games.slice(0, 3), id: user._id });
    });
    mergeGamble(users);
  }, [data, mergeGamble, setLoadingScore]);
  return { userScore };
};

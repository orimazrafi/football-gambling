import React from "react";
import { useSelector } from "react-redux";
import { SuccessButton } from "../../elements/SuccessButton";
import { Game, Team } from "../../interfaces";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { useInitialSetUserGamblesAndPotentialGambles } from "../../Hooks/useInitialSetUserGamblesAndPotentialGambles";
import { useSetWinningTeamGamble } from "../../Hooks/useSetWinningTeamGamble";
import { useFetchUserResults } from "../../Hooks/useFetchUserResults";
import { ScorerAndTeamWrapper } from "../../Components/ScorerAndTeamWrapper/ScorerAndTeamWrapper";
import "./BestScorer.css";
// eslint-disable-next-line
const log = console.log;
interface User {
  _id: string;
  winningTeam: string;
  bestScorer: string;
  results: {
    games: Game[];
    _id: string;
    players: [];
    teams: Team[];
  };
}
export const BestScorer = () => {
  const { user } = useSelector(
    (
      state: { user: { user: User } }
      //   {
      //   user: {
      //     user: {
      //       _id: string;
      //       winningTeam: string;
      //       bestScorer: string;
      //       results: {
      //         games: Game[];
      //         _id: string;
      //         players: [];
      //         teams: Team[];
      //       };
      //     };
      //   };
      // }
    ) => state.user
  );

  const { data, loadingUserResults } = useFetchUserResults(user._id);

  useInitialSetUserGamblesAndPotentialGambles(data, user);

  const { handleChange, handleSave } = useSetWinningTeamGamble(user);

  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
          <ScorerAndTeamWrapper
            array={user.results.players}
            handleChange={handleChange}
            user={user}
            name={"bestScorer"}
          />
          <SuccessButton
            margin="1em auto"
            padding="0.5em"
            onClick={handleSave}
            background="rgb(28, 184, 65)"
          >
            Save
          </SuccessButton>
        </>
      )}
    </>
  );
};

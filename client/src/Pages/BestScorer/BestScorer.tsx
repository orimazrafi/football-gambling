import React from "react";
import { useSelector } from "react-redux";
import { SuccessButton } from "../../elements/SuccessButton";
import { UserWithFullResults } from "../../interfaces";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { useInitialSetUserGamblesAndPotentialGambles } from "../../Hooks/useInitialSetUserGamblesAndPotentialGambles";
import { useSetWinningTeamGamble } from "../../Hooks/useSetWinningTeamGamble";
import { useFetchUserResults } from "../../Hooks/useFetchUserResults";
import { ScorerAndTeamWrapper } from "../../Components/ScorerAndTeamWrapper/ScorerAndTeamWrapper";
import "./BestScorer.css";

export const BestScorer = () => {
  const { user } = useSelector(
    (state: { user: { user: UserWithFullResults } }) => state.user
  );

  const { data, loadingUserResults } = useFetchUserResults(user._id);

  useInitialSetUserGamblesAndPotentialGambles(data, user);

  const { handleChange, handleSave } = useSetWinningTeamGamble(user);
  const userHasNoGroups = () => {
    return (
      <h1 className="user--has--no--groups">
        You need To join At Least one Group!
      </h1>
    );
  };
  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
          {data.getUser.user.results !== null ? (
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
          ) : (
            userHasNoGroups()
          )}
        </>
      )}
    </>
  );
};

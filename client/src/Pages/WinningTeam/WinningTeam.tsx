import React from "react";
import { useSelector } from "react-redux";
import { UserGambels } from "../../interfaces";
import { SuccessButton } from "../../elements/SuccessButton";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { useSaveWinningTeam } from "../../Hooks/useSaveWinningTeam";
import { useChangeWinningTeam } from "../../Hooks/useChangeWinningTeam";
import { useSetInitialUserWithTeamIfHave } from "../../Hooks/useSetInitialUserWithTeamIfHave";
import { useFetchUserResults } from "../../Hooks/useFetchUserResults";
import { ScorerAndTeamWrapper } from "../../Components/ScorerAndTeamWrapper/ScorerAndTeamWrapper";

export const WinningTeam = () => {
  const { user } = useSelector((state: { user: UserGambels }) => state.user);

  const { data, loadingUserResults } = useFetchUserResults(user._id);
  useSetInitialUserWithTeamIfHave(data, user);
  const handleChange = useChangeWinningTeam();
  const { handleSave } = useSaveWinningTeam(user);
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
                array={user.results.teams}
                handleChange={handleChange}
                user={user}
                name={"winningTeam"}
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

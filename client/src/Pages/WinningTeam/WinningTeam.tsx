import React from "react";
import { useSelector } from "react-redux";
import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";
import { useQuery } from "react-apollo";
import { FETCH_USER_RESULT } from "../../queries";
import { UserGambels, Team } from "../../interfaces";
import { SuccessButton } from "../../elements/SuccessButton";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { useSaveWinningTeam } from "../../Hooks/useSaveWinningTeam";
import { useChangeWinningTeam } from "../../Hooks/useChangeWinningTeam";
import { useSetInitialUserWithTeamIfHave } from "../../Hooks/useSetInitialUserWithTeamIfHave";
// eslint-disable-next-line
const log = console.log;

export const WinningTeam = () => {
  const { user } = useSelector((state: { user: UserGambels }) => state.user);
  const { data, loading: loadingUserResults } = useQuery<
    any,
    Record<string, any>
  >(FETCH_USER_RESULT, {
    variables: {
      userId: user._id || (localStorage.getItem("user_id") as string),
    },
  });
  useSetInitialUserWithTeamIfHave(data, user);
  const { handleChange } = useChangeWinningTeam();
  const { handleSave } = useSaveWinningTeam(user);

  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
          <div className="gambling-table">
            {user.results.teams && (
              <div
                style={{
                  margin: "4em auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gridGap: "6rem 0 ",
                }}
              >
                {user.results.teams.map((team: Team) => (
                  <IconsGrid
                    image={team.image}
                    name={team.name}
                    teamName={""}
                    value={user.winningTeam}
                    key={Math.random()}
                    onChange={handleChange}
                  />
                ))}
              </div>
            )}
          </div>
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

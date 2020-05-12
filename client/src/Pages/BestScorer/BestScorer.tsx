import React from "react";
import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";
import { useSelector } from "react-redux";
import { useQuery } from "react-apollo";
import { FETCH_USER_RESULT } from "../../queries";
import { SuccessButton } from "../../elements/SuccessButton";
import { Game, Team } from "../../interfaces";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { userIdFromLocalStorage } from "../../helpers";
import { useInitialSetUserGamblesAndPotentialGambles } from "../../Hooks/useInitialSetUserGamblesAndPotentialGambles";
import { useSetWinningTeamGamble } from "../../Hooks/useSetWinningTeamGamble";
// eslint-disable-next-line
const log = console.log;
export const BestScorer = () => {
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: string;
          winningTeam: string;
          bestScorer: string;
          results: {
            games: Game[];
            _id: string;
            players: [];
            teams: Team[];
          };
        };
      };
    }) => state.user
  );

  const { data, loading: loadingUserResults } = useQuery<
    any,
    Record<string, any>
  >(FETCH_USER_RESULT, {
    variables: {
      userId: user._id || userIdFromLocalStorage(),
    },
  });

  useInitialSetUserGamblesAndPotentialGambles(data, user);

  const { handleChange, handleSave } = useSetWinningTeamGamble(user);

  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
          <div className="gambling-table">
            {user.results.players && (
              <div
                style={{
                  margin: "4em auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gridGap: "6rem 0 ",
                }}
              >
                {user.results.players.map((player: any) => (
                  <IconsGrid
                    image={player.image}
                    name={player.name}
                    teamName={player.team}
                    value={user.bestScorer}
                    onChange={handleChange}
                    key={Math.random()}
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

import React from "react";
import moment from "moment";
import { Image } from "../../elements/Image";
import { Game, Team } from "../../interfaces";
import { useSelector } from "react-redux";
import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import { GambleButton } from "../../elements/GambleButton";
import { FETCH_USER_RESULT } from "../../queries";
import { useQuery } from "react-apollo";
import { SuccessButton } from "../../elements/SuccessButton";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { useSetMatchesGamble } from "../../Hooks/useSetMatchesGamble";
import { useRandomGamble } from "../../Hooks/useRandomGamble";
import { useSaveGamble } from "../../Hooks/useSaveGamble";
import { useRandomGambleConfirmationBox } from "../../Hooks/useRandomGambleConfirmationBox";
import { useSetIntialResultFromServer } from "../../Hooks/useSetIntialResultFromServer";
import "./MatchesGamble.css";
// eslint-disable-next-line
const log = console.log;
const NUMBER_OF_PLAYED_GAMES = 3;
export const MatchesGamble = () => {
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: "";
          winningTeam: "";
          bestScorer: "";
          results: {
            games: Game[];
            _id: "";
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
      userId: user._id || (localStorage.getItem("user_id") as string),
    },
  });
  useSetIntialResultFromServer(user, data);
  const { handleChange } = useSetMatchesGamble();
  const { addRandom } = useRandomGamble(user);
  const { handleRandomGamble } = useRandomGambleConfirmationBox(addRandom);
  const { handleSave } = useSaveGamble(user);

  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
          <div className="gambling-table">
            {user.results.games.map((match: Game, index: number) => (
              <GambleWrapper key={Math.random()}>
                <GambleUnit width="25%">
                  {index < NUMBER_OF_PLAYED_GAMES ? (
                    <span className="gambling-table__game__played__text">
                      Played
                    </span>
                  ) : (
                    <>
                      {index === NUMBER_OF_PLAYED_GAMES ? (
                        <span className="gambling-table__game__playing__today__text">
                          Today{" "}
                        </span>
                      ) : (
                        <>{moment(match.eventDate).format("l")}</>
                      )}
                      ({moment(match.eventDate).format("LT")})
                    </>
                  )}
                </GambleUnit>
                <GambleUnit width="15%">{match.homeTeam.name}</GambleUnit>
                <Image
                  noboard="unset"
                  margin="10px 0 10px 0"
                  verticalalign="middle"
                  height="30px"
                  width="30px"
                  src={match.homeTeam.image}
                />

                <GambleUnit width="10%">
                  <input
                    type="text"
                    name="homeTeam"
                    className="gambling-table__score__input"
                    value={user.results.games[index].homeTeam.score}
                    disabled={index < 3}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, index)
                    }
                  />
                  --
                  <input
                    type="text"
                    name="awayTeam"
                    className="gambling-table__score__input"
                    disabled={index < 3}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, index)
                    }
                    value={user.results.games[index].awayTeam.score}
                  />
                </GambleUnit>
                <Image
                  noboard="unset"
                  margin="10px 0 10px 0"
                  verticalalign="middle"
                  height="30px"
                  width="30px"
                  src={match.awayTeam.image}
                />

                <GambleUnit width="30%">
                  {" " + match.awayTeam.name}{" "}
                </GambleUnit>
                <GambleButton
                  variant="contained"
                  color="primary"
                  background="blue"
                  backgroundhover="rgba(0, 0, 0, 0.12)"
                  disabled={index < 3}
                  onClick={() => {
                    handleRandomGamble(index);
                  }}
                >
                  Luck Gamble
                </GambleButton>
              </GambleWrapper>
            ))}
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

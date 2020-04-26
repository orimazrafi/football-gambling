import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo";
import { FETCH_USER_RESULT, FETCH_LEAGUE_RESULT } from "../../queries";
import { LoadingText } from "../../elements/LoadingText";
import { Game } from "../../interfaces";
import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import { Image } from "../../elements/Image";
import "./Opponents.css";
// import moment from "moment";

const log = console.log;
export const Opponents = () => {
  const history: any = useHistory();
  const { data, loading: loadingLeague } = useQuery<any, Record<string, any>>(
    FETCH_USER_RESULT,
    {
      variables: {
        userId: history.location.state.userId,
      },
    }
  );
  const { data: leagueResult, loading: loadingLeagueResult } = useQuery<
    any,
    Record<string, any>
  >(FETCH_LEAGUE_RESULT, {
    variables: {
      leagueId: history.location.state.leagueId,
    },
  });

  const checkForGamble = (leagueResult: any, userResult: any) => {
    let userHome = parseInt(userResult.homeTeam.score);
    let userAway = parseInt(userResult.awayTeam.score);
    let leagueHome = parseInt(leagueResult.homeTeam.score);
    let leagueAway = parseInt(leagueResult.awayTeam.score);
    let results = { userHome, userAway, leagueHome, leagueAway };
    if (leagueHome === leagueAway) return handleTieGame(results);
    if (leagueHome > leagueAway) return homeTeamWins(results);
    if (leagueAway > leagueHome) return awayTeamWins(results);
  };
  const handleTieGame: any = (results: any) => {
    if (results.userHome === results.userAway) {
      return results.userHome === results.leagueHome ? 3 : 1;
    } else {
      return 0;
    }
  };
  const homeTeamWins = (results: any) => {
    if (results.userHome > results.userAway) {
      return results.leagueHome === results.userHome &&
        results.leagueAway === results.leagueHome
        ? 3
        : 1;
    } else {
      return 0;
    }
  };
  const awayTeamWins = (results: any) => {
    if (results.userAway > results.userHome) {
      return results.leagueHome === results.userHome &&
        results.leagueAway === results.leagueHome
        ? 3
        : 1;
    } else {
      return 0;
    }
  };
  const handleClass = (c: any) => {
    let className = "";
    if (c === 1) return (className += "red");
    if (c === 0) return (className += "blue");
    return "green";
  };
  return (
    <div>
      <span>{data?.getUser.user.results.name} League</span>
      {
        <Image
          src={data?.getUser.user.results.image}
          alt={data?.getUser.user.results.name}
          noboard="unset"
          margin="1em auto 2em auto"
          verticalalign="middle"
          height="60px"
          width="60px"
        />
      }
      <div className="gambling-table">
        {loadingLeague ? (
          <LoadingText>Loading user Gamble...</LoadingText>
        ) : (
          <div>
            <div>
              {leagueResult?.league.league &&
                data?.getUser.user.results.games
                  .slice(0, 3)
                  .map((match: Game, index: number) => (
                    <GambleWrapper key={Math.random()}>
                      <GambleUnit width="10%">
                        played
                        {/* {moment(match.eventDate).format("lll")} */}
                      </GambleUnit>
                      <GambleUnit width="15%">{match.homeTeam.name}</GambleUnit>
                      <Image
                        noboard="unset"
                        margin="0 0 10px"
                        verticalalign="middle"
                        height="30px"
                        width="30px"
                        src={match.homeTeam.logo}
                      />

                      <GambleUnit width="10%">
                        <span>{match.homeTeam.score}</span>
                        --
                        <span style={{ marginLeft: "10px" }}>
                          {match.awayTeam.score}
                        </span>
                      </GambleUnit>
                      <Image
                        noboard="unset"
                        margin="0 0 10px"
                        verticalalign="middle"
                        height="30px"
                        width="30px"
                        src={match.awayTeam.logo}
                      />
                      <GambleUnit width="10%">end result</GambleUnit>
                      <GambleUnit width="10%">
                        {" " +
                          leagueResult?.league?.league.games[index].homeTeam
                            .score}{" "}
                        --
                        {" " +
                          leagueResult?.league?.league.games[index].awayTeam
                            .score}{" "}
                      </GambleUnit>
                      <GambleUnit width="5%">
                        <span
                          className={handleClass(
                            checkForGamble(
                              leagueResult?.league?.league.games[index],
                              match
                            )
                          )}
                        >
                          {checkForGamble(
                            leagueResult?.league?.league.games[index],
                            match
                          )}
                        </span>
                      </GambleUnit>
                    </GambleWrapper>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

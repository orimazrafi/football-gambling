import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { Game } from "../../interfaces";

import { SmallImage } from "../../elements/SmallImage";
interface Props {
  gambler: any;
  group: any;
}

const handleTieGame = (results: any) => {
  if (results.userHome === results.userAway) {
    return results.userHome === results.leagueHome ? 3 : 1;
  } else {
    return 0;
  }
};
const homeTeamWins = (results: any) => {
  if (results.userHome > results.userAway) {
    return results.leagueHome === results.userHome &&
      results.leagueAway === results.userAway
      ? 3
      : 1;
  } else {
    return 0;
  }
};
const awayTeamWins = (results: any) => {
  if (results.userAway > results.userHome) {
    return results.leagueHome === results.userHome &&
      results.leagueAway === results.userAway
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
export const OpponentsBody = (props: Props) => {
  const { gambler, group } = props;
  return (
    <TableBody>
      {gambler.results.games.slice(0, 5).map((match: Game, index: number) => {
        return (
          <TableRow hover key={Math.random()}>
            <GroupCell fontSize="1rem" fontWeight="normal" textoverflow="unset">
              played
            </GroupCell>
            <GroupCell fontSize="1rem" fontWeight="normal" textoverflow="unset">
              <SmallImage
                src={match.homeTeam.image}
                alt={match.homeTeam.name}
              ></SmallImage>
              <p style={{ display: "inline-block" }}>{match.homeTeam.name}</p>
            </GroupCell>
            <GroupCell fontSize="1rem" fontWeight="normal" textoverflow="unset">
              {match.awayTeam.name}
              <SmallImage
                src={match.awayTeam.image}
                alt={match.awayTeam.name}
              ></SmallImage>
            </GroupCell>

            <GroupCell fontSize="1rem" fontWeight="normal" textoverflow="unset">
              {" "}
              <SmallImage
                src={match.homeTeam.image}
                alt={match.homeTeam.name}
              ></SmallImage>
              {" " + group.league.games[index].homeTeam.score} -
              {" " + group.league.games[index].awayTeam.score}
              <SmallImage
                src={match.awayTeam.image}
                alt={match.awayTeam.name}
              ></SmallImage>
            </GroupCell>
            <GroupCell fontSize="1rem" fontWeight="normal" textoverflow="unset">
              <SmallImage
                src={match.homeTeam.image}
                alt={match.homeTeam.name}
              ></SmallImage>
              {match.homeTeam.score}- {match.awayTeam.score}
              <SmallImage
                src={match.awayTeam.image}
                alt={match.awayTeam.name}
              ></SmallImage>
            </GroupCell>
            <GroupCell fontSize="1rem" fontWeight="normal" textoverflow="unset">
              {" "}
              <span
                className={handleClass(
                  checkForGamble(group.league.games[index], match)
                )}
              >
                {checkForGamble(group.league?.games[index], match)}
              </span>
            </GroupCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

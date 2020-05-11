import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { Game } from "../../interfaces";

import { SmallImage } from "../../elements/SmallImage";
import { UseHomeTeamWins } from "../../Hooks/UseHomeTeamWins";
import { UseAwayTeamWins } from "../../Hooks/UseAwayTeamWins";
import { UseTieGame } from "../../Hooks/UseTieGame";
// eslint-disable-next-line
const log = console.log;
interface Props {
  gambler: any;
  group: any;
}
interface Result {
  userHome: number | string;
  userAway: number | string;
  leagueHome: number | string;
  leagueAway: number | string;
}
const LOSING_POINTS = 1;
const DRAW_POINTS = 0;
const colorPoints = (point: any) => {
  let className = "";
  if (point === LOSING_POINTS) return (className += "red");
  if (point === DRAW_POINTS) return (className += "blue");
  return "green";
};

const getPointsForGamble = (leagueResult: Game, userResult: Game) => {
  let userHome = parseInt(userResult.homeTeam.score);
  let userAway = parseInt(userResult.awayTeam.score);
  let leagueHome = parseInt(leagueResult.homeTeam.score);
  let leagueAway = parseInt(leagueResult.awayTeam.score);
  let result: Result = { userHome, userAway, leagueHome, leagueAway };
  if (leagueHome === leagueAway) return UseTieGame(result);
  if (leagueHome > leagueAway) return UseHomeTeamWins(result);
  if (leagueAway > leagueHome) return UseAwayTeamWins(result);
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
                className={colorPoints(
                  getPointsForGamble(group.league.games[index], match)
                )}
              >
                {getPointsForGamble(group.league?.games[index], match)}
              </span>
            </GroupCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

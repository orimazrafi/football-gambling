import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { LeagueOfGroup, Game, UserResults } from "../../interfaces";
import { SmallImage } from "../../elements/SmallImage";
import { PointsPerGame } from "../PointsPerGame/PointsPerGame/PointsPerGame";
import { FinalScoreCell } from "../FinalScoreCell/FinalScoreCell";
import { YourGambleCell } from "../YourGambleCell/YourGambleCell";

// eslint-disable-next-line
const log = console.log;
interface Props {
  gambler: UserResults;
  group: LeagueOfGroup;
}

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
            <FinalScoreCell match={match} group={group} index={index} />
            <YourGambleCell match={match} />
            <PointsPerGame group={group} index={index} match={match} />
          </TableRow>
        );
      })}
    </TableBody>
  );
};

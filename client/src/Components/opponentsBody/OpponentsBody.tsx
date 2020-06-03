import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { LeagueOfGroup, Game, UserResults } from "../../interfaces";
import { SmallImage } from "../../elements/SmallImage";
import { PointsPerGame } from "../PointsPerGame/PointsPerGame/PointsPerGame";
import { FinalScoreCell } from "../FinalScoreCell/FinalScoreCell";
import { YourGambleCell } from "../YourGambleCell/YourGambleCell";
import "./OpponentsBody.css";

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
              <p className="opponnets--page--team--with--image">
                {match.homeTeam.name}
              </p>
            </GroupCell>
            <GroupCell fontSize="1rem" fontWeight="normal" textoverflow="unset">
              <p className="opponnets--page--team--with--image">
                {match.awayTeam.name}
              </p>
              <SmallImage
                src={match.awayTeam.image}
                alt={match.awayTeam.name}
              ></SmallImage>
            </GroupCell>
            <YourGambleCell match={match} />
            <FinalScoreCell match={match} group={group} index={index} />
            <PointsPerGame group={group} index={index} match={match} />
          </TableRow>
        );
      })}
    </TableBody>
  );
};

import React from "react";
import { GroupCell } from "../../elements/GroupCell";
import { LeagueOfGroup, Game } from "../../interfaces";
import { SmallImage } from "../../elements/SmallImage";

interface Props {
  match: Game;
  index: number;
  group: LeagueOfGroup;
}
export const FinalScoreCell = (props: Props) => {
  const { match, group, index } = props;
  return (
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
  );
};

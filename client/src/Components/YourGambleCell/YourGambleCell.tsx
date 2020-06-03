import React from "react";
import { Game } from "../../interfaces";
import { GroupCell } from "../../elements/GroupCell";
import { SmallImage } from "../../elements/SmallImage";
interface Props {
  match: Game;
}
export const YourGambleCell = (props: Props) => {
  const { match } = props;
  return (
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
  );
};

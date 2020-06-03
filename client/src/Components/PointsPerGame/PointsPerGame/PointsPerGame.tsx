import React from "react";
import { GroupCell } from "../../../elements/GroupCell";
import { LeagueOfGroup, Game } from "../../../interfaces";
import { useGetPointsForGAmble } from "../../../Hooks/useGetPointsForGAmble";

interface Props {
  group: LeagueOfGroup;
  index: number;
  match: Game;
}
const LOSING_POINTS = 1;
const DRAW_POINTS = 0;
export const PointsPerGame = (props: Props) => {
  const { group, index, match } = props;
  const { getPointsForGamble } = useGetPointsForGAmble();
  const colorPoints = (
    point: { id: string; score: number; name: string } | number | undefined
  ) => {
    let className = "";
    if (point === LOSING_POINTS) return (className += "red");
    if (point === DRAW_POINTS) return (className += "blue");
    return "green";
  };

  return (
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
  );
};

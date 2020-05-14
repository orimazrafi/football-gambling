import React from "react";
import { Game } from "../../interfaces";
import { GambleUnit } from "../../elements/GambleUnit";
import moment from "moment";

interface Props {
  index: number;
  match: Game;
}
const NUMBER_OF_PLAYED_GAMES = 3;

export const MatchDateColumn = (props: Props) => {
  const { index, match } = props;
  return (
    <GambleUnit width="25%">
      {index < NUMBER_OF_PLAYED_GAMES ? (
        <span className="gambling-table__game__played__text">Played</span>
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
  );
};

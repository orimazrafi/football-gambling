import React from "react";
import { UserResults } from "../../interfaces";
import { Image } from "../../elements/Image";
import { ScoreItem } from "../../elements/ScoreItem";
interface Props {
  index: number;
  gambler: UserResults;
  score: any;
}
const MAXIMUM_POINTS_PER_GAME = 3;
const NUMBER_TO_MAKE_WHOLE_PERCENTAGE = 100;
export const ScoreTableRowInformation = (props: Props) => {
  const { index, gambler, score } = props;
  return (
    <>
      <div>{index + 1}.</div>
      <Image
        noboard="1px solid black"
        margin="0"
        verticalalign="unset"
        height="30px"
        width="30px"
        src={gambler.image}
      />
      <ScoreItem>{gambler.name}</ScoreItem>
      <ScoreItem>
        {" "}
        {score[gambler._id]?.score
          ? Number(
              (score[gambler._id]?.score /
                (gambler?.results?.games?.slice(0, 3).length *
                  MAXIMUM_POINTS_PER_GAME)) *
                NUMBER_TO_MAKE_WHOLE_PERCENTAGE
            ).toFixed(0)
          : 0}
        %
      </ScoreItem>
      <ScoreItem>Bullseye {score[gambler._id]?.bullseye || 0}</ScoreItem>
      <ScoreItem>{score[gambler._id]?.score || 0}</ScoreItem>
    </>
  );
};

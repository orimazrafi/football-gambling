import React from "react";
import List from "@material-ui/core/List";

import { UserResults, GroupUsersAndLeague } from "../../interfaces";
import { useSetScoreTable } from "../../Hooks/useSetScoreTable";
import { ImageAndLeagueDetails } from "../ImageAndLeagueDetails/ImageAndLeagueDetails";
import "./ScoreList.css";
import { PointsListDetails } from "../PointsListDetails/PointsListDetails";
interface Props {
  group: GroupUsersAndLeague;
  gambler: UserResults;
  score: number;
  bullseye: number;
}

export const ScoreList = (props: Props) => {
  const { group, gambler, score, bullseye } = props;
  const listItem = useSetScoreTable(group, gambler, score, bullseye);
  return (
    <List className="score-list">
      {listItem.map((list: any) =>
        list.alt ? (
          <ImageAndLeagueDetails list={list} key={Math.random()} />
        ) : (
          <PointsListDetails list={list} key={Math.random()} />
        )
      )}
    </List>
  );
};

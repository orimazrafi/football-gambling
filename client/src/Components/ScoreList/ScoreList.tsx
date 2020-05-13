import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import "./ScoreList.css";
import { UserResults, GroupUsersAndLeague } from "../../interfaces";
import { useSetScoreTable } from "../../Hooks/useSetScoreTable";
interface Props {
  group: GroupUsersAndLeague;
  gambler: UserResults;
  score: number;
  bullseye: number;
}

export const ScoreList = (props: Props) => {
  const { group, gambler, score, bullseye } = props;
  const { listItem } = useSetScoreTable(group, gambler, score, bullseye);
  return (
    <List className="score-list">
      {listItem.map((list: any) =>
        list.alt ? (
          <ListItem key={Math.random()}>
            <ListItemAvatar>
              <Avatar src={list.src} alt={list.alt}></Avatar>
            </ListItemAvatar>
            <ListItemText
              className="score__item__text"
              primary={list.primary}
            ></ListItemText>
          </ListItem>
        ) : (
          <ListItem key={Math.random()}>
            <ListItemAvatar>
              <Avatar
                className="score--list--avatar--label"
                style={{ fontSize: list.fontSize }}
              >
                {list.name}
              </Avatar>
            </ListItemAvatar>
            <ListItemAvatar
              className="score--list--avatar--text"
              style={{ margin: "auto" }}
            >
              <Avatar
                className="score--list--avatar--text__avatar"
                style={{
                  fontSize: list.fontSize,
                }}
              >
                {list.primary}
              </Avatar>
            </ListItemAvatar>
          </ListItem>
        )
      )}
    </List>
  );
};

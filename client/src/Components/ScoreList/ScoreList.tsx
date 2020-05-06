import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import "./ScoreList.css";
import { UserResults, GroupUsersAndLeague } from "../../interfaces";
interface Props {
  group: GroupUsersAndLeague;
  gambler: UserResults;
  score: number;
  bullseye: number;
}
export const ScoreList = (props: Props) => {
  const { group, gambler, score, bullseye } = props;
  const listItem = [
    {
      src: group.league.image,
      alt: group.league.name,
      primary: group.league.name,
    },
    { src: gambler.image, alt: gambler.name, primary: gambler.name },
    { name: "Score", primary: score, fontSize: "0.8rem" },
    {
      name: "%",
      primary:
        Number(score / (gambler.results.games.slice(0, 3).length * 3)).toFixed(
          2
        ) + "%",
      fontSize: "0.8rem",
    },
    { name: "Bullesye", primary: bullseye, fontSize: "0.6rem" },
  ];
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
                style={{ fontSize: list.fontSize, background: "blueviolet" }}
              >
                {list.name}
              </Avatar>
            </ListItemAvatar>
            <ListItemAvatar style={{ margin: "auto" }}>
              <Avatar
                style={{
                  fontSize: list.fontSize,
                  background: "#5d5757",
                  color: "red",
                  fontWeight: "bold",
                  border: "1px solid black",
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

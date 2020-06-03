import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

interface Props {
  list: any;
}
export const ImageAndLeagueDetails = (props: Props) => {
  const { src, alt, primary } = props.list;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={src} alt={alt}></Avatar>
      </ListItemAvatar>
      <ListItemText
        className="score__item__text"
        primary={primary}
      ></ListItemText>
    </ListItem>
  );
};

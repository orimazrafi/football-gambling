import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
interface Props {
  list: any;
}
export const PointsListDetails = (props: Props) => {
  const { fontSize, name, primary } = props.list;
  return (
    <ListItem key={Math.random()}>
      <ListItemAvatar>
        <Avatar
          className="score--list--avatar--label"
          style={{ fontSize: fontSize }}
        >
          {name}
        </Avatar>
      </ListItemAvatar>
      <ListItemAvatar
        className="score--list--avatar--text"
        style={{ margin: "auto" }}
      >
        <Avatar
          className="score--list--avatar--text__avatar"
          style={{
            fontSize: fontSize,
          }}
        >
          {primary}
        </Avatar>
      </ListItemAvatar>
    </ListItem>
  );
};

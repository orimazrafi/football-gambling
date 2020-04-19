import React from "react";
import { useHistory } from "react-router-dom";
import { H4 } from "../../elements/H4";
export const Opponents = () => {
  const history: any = useHistory();
  return (
    <div>
      Opponents
      <H4>{history.location.state.name}</H4>
    </div>
  );
};

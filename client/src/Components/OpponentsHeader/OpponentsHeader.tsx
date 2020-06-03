import React from "react";
import { UserWithOpponentsNoRedux } from "../../interfaces";
interface Props {
  user: UserWithOpponentsNoRedux;
  pageLoaction: string;
}
export const OpponentsHeader = (props: Props) => {
  const { user, pageLoaction } = props;
  return (
    <div className="opponents--header--wrapper">
      <div>
        <img
          src={user?.opponent?.image}
          alt={user?.opponent?.name}
          className="opponents--header--wrapper__left__image"
        />
      </div>
      <div>
        <h1>{pageLoaction}</h1>
      </div>
      <div>
        <img
          src={user?.opponent?.image}
          alt={user?.opponent?.name}
          className="opponents--header--wrapper__right__image"
        />
      </div>
    </div>
  );
};

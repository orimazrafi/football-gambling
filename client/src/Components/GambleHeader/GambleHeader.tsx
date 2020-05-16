import React from "react";
import { UserWithOpponentsNoRedux } from "../../interfaces";
interface Props {
  user: UserWithOpponentsNoRedux;
  pageLoaction: string;
}
export const GambleHeader = (props: Props) => {
  const { user, pageLoaction } = props;
  return (
    <div className="header__gamble__wrapper">
      <div>
        <img
          src={user?.results?.image}
          alt={user?.results?.name}
          className="header__gamble__wrapper__left__image"
        />
      </div>
      <div>
        <h1>{pageLoaction}</h1>
      </div>
      <div>
        <img
          src={user?.results?.image}
          alt={user?.results?.name}
          className="header__gamble__wrapper__right__image"
        />
      </div>
    </div>
  );
};

import React from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import { usePageLocation } from "../../Hooks/usePageLocation";
import { UserWithOpponents } from "../../interfaces";
export const OpponentsAndGamblesHeader = () => {
  const { user } = useSelector((state: UserWithOpponents) => state.user);
  const { pathname } = useLocation();

  const { pageLoaction } = usePageLocation(pathname);
  let momentFormat: moment.Moment = moment();
  const oneOfTheGamblePages = (pageLoaction: string) => {
    if (
      pageLoaction === "gamble" ||
      pageLoaction === "best-scorer" ||
      pageLoaction === "winning-team"
    )
      return true;
    else return false;
  };
  const opponentPage = (pageLoaction: string) =>
    pageLoaction === "opponents" ? true : false;

  return (
    <>
      {pageLoaction !== "secret" && (
        <>
          <div className="header">
            {oneOfTheGamblePages(pageLoaction) &&
              (!user?.results?.image && !user?.results?.image ? (
                <LoadingGif loading={true} size={100} />
              ) : (
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
              ))}
            {opponentPage("opponents") &&
              (!user?.opponent?.image ? (
                <LoadingGif loading={true} size={100} />
              ) : (
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
              ))}
            {!opponentPage("opponents") &&
              !oneOfTheGamblePages(pageLoaction) && <h1>{pageLoaction}</h1>}
            <pre className="header__watch">
              {momentFormat.format("ddd, hA")}
            </pre>
          </div>
          <hr />
        </>
      )}
    </>
  );
};

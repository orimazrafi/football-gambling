import React from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import { usePageLocation } from "../../Hooks/usePageLocation";
export const OpponentsAndGamblesHeader = () => {
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: string;
          results: { name: string; image: string };
          opponent: {
            name: string;
            image: string;
          };
        };
      };
    }) => state.user
  );
  const { pathname } = useLocation();

  const { pageLoaction } = usePageLocation(pathname);
  let momentFormat: moment.Moment = moment();
  return (
    <>
      {pageLoaction !== "secret" && (
        <>
          <div className="header">
            {(pageLoaction === "gamble" ||
              pageLoaction === "best-scorer" ||
              pageLoaction === "winning-team") &&
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
            {pageLoaction === "opponents" &&
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
            {pageLoaction !== "opponents" &&
              pageLoaction !== "gamble" &&
              pageLoaction !== "best-scorer" &&
              pageLoaction !== "winning-team" && <h1>{pageLoaction}</h1>}
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

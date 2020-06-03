import React from "react";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import { usePageLocation } from "../../Hooks/usePageLocation";
import { UserWithOpponents } from "../../interfaces";
import { OpponentsHeader } from "../OpponentsHeader/OpponentsHeader";
import { GambleHeader } from "../GambleHeader/GambleHeader";
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
            {oneOfTheGamblePages(pageLoaction) && user?.results !== null ? (
              !user?.results?.image && !user?.results?.image ? (
                <LoadingGif loading={true} size={100} />
              ) : (
                <GambleHeader user={user} pageLoaction={pageLoaction} />
              )
            ) : (
              <div style={{ height: 100 }}></div>
            )}
            {opponentPage(pageLoaction) &&
              (!user?.opponent?.image ? (
                <LoadingGif loading={true} size={100} />
              ) : (
                <OpponentsHeader user={user} pageLoaction={pageLoaction} />
              ))}
            {pageLoaction !== "opponents" &&
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

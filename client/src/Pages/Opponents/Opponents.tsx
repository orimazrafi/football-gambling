import React from "react";
import { useHistory } from "react-router-dom";
import { H4 } from "../../elements/H4";
import { useQuery } from "react-apollo";
import { FETCH_USER_RESULT } from "../../queries";
import { LoadingText } from "../../elements/LoadingText";
import { Game } from "../../interfaces";
import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import { Image } from "../../elements/Image";
import moment from "moment";

const log = console.log;
export const Opponents = () => {
  const history: any = useHistory();
  const { data, loading: loadingLeague } = useQuery<any, Record<string, any>>(
    FETCH_USER_RESULT,
    {
      variables: {
        userId: history.location.state.id,
      },
    }
  );

  const getRandomColor: () => string = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  log(data?.getUser.user.results.games.splice(0, 5));
  return (
    <div>
      <span>{data?.getUser.user.results.name} League</span>
      {
        <Image
          src={data?.getUser.user.results.image}
          alt={data?.getUser.user.results.name}
          noboard="unset"
          margin="1em auto 2em auto"
          verticalalign="middle"
          height="60px"
          width="60px"
        />
      }
      <div className="gambling-table">
        {loadingLeague ? (
          <LoadingText>Loading user Gamble...</LoadingText>
        ) : (
          <>
            {data?.getUser.user.results.games
              .splice(0, 3)
              .map((match: Game) => (
                <GambleWrapper key={Math.random()}>
                  <GambleUnit width="25%">
                    {moment(match.eventDate).format("lll")}
                  </GambleUnit>
                  <GambleUnit width="15%">{match.homeTeam.name}</GambleUnit>
                  <Image
                    noboard="unset"
                    margin="0 0 10px"
                    verticalalign="middle"
                    height="30px"
                    width="30px"
                    src={match.homeTeam.logo}
                  />

                  <GambleUnit width="10%">
                    <span>{match.homeTeam.score}</span>
                    --
                    <span style={{ marginLeft: "10px" }}>
                      {match.awayTeam.score}
                    </span>
                  </GambleUnit>
                  <Image
                    noboard="unset"
                    margin="0 0 10px"
                    verticalalign="middle"
                    height="30px"
                    width="30px"
                    src={match.awayTeam.logo}
                  />
                  <GambleUnit width="15%">
                    {" " + match.awayTeam.name}{" "}
                  </GambleUnit>
                  <GambleUnit width="15%">
                    <span style={{ color: getRandomColor() }}>
                      {Math.floor(Math.random() * 3) + 1}
                    </span>
                  </GambleUnit>
                </GambleWrapper>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

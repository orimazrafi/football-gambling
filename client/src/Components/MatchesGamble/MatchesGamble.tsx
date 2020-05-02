import React, { useState } from "react";
import moment from "moment";
import { Image } from "../../elements/Image";
import { Game } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";

import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import { reduxSetUserGames } from "../../Features/User/UserSlice";
const log = console.log;
export const MatchesGamble = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: string;
          results: {
            games: any;
          };
        };
      };
    }) => state.user
  );

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let gamesDuplicate = [...user.results.games];
    log(gamesDuplicate[index][name]);
    log(typeof value);
    if (parseInt(value) > 0 || parseInt(value) < 10) {
      await dispatch(reduxSetUserGames(index, name, value));
    }
  };
  return (
    <div className="gambling-table">
      {user.results.games &&
        user.results.games.map((match: Game, index: number) => (
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
              src={match.homeTeam.image}
            />

            <GambleUnit width="10%">
              <input
                type="text"
                name="homeTeam"
                style={{ width: "2vmax" }}
                value={user.results.games[index].homeTeam.score}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, index)
                }
              />
              --
              <input
                type="text"
                name="awayTeam"
                style={{ width: "2vmax" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, index)
                }
                value={user.results.games[index].awayTeam.score}
              />
            </GambleUnit>
            <Image
              noboard="unset"
              margin="0 0 10px"
              verticalalign="middle"
              height="30px"
              width="30px"
              src={match.awayTeam.image}
            />
            <GambleUnit width="15%">{" " + match.awayTeam.name} </GambleUnit>
          </GambleWrapper>
        ))}
    </div>
  );
};

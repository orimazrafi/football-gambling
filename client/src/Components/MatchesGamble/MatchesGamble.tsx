import React from "react";
import moment from "moment";
import { Image } from "../../elements/Image";
import { Game } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import {
  reduxSetUserGames,
  ResuxSetRandomGame,
} from "../../Features/User/UserSlice";
import { ADD_RANDOM_GAMBLE } from "../../mutations";
import { toast } from "react-toastify";
import request from "graphql-request";
import { BACKEND_URL } from "../../helpers";
import { GambleButton } from "../../elements/GambleButton";
// eslint-disable-next-line
const log = console.log;
export const MatchesGamble = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: string;
          winningTeam: string;
          bestScorer: string;
          results: {
            games: Game[];
            _id: string;
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
    if (parseInt(value) > 0 || parseInt(value) < 10) {
      await dispatch(reduxSetUserGames(index, name, value));
    }
  };

  const addRandom = (index: number) => {
    const variables = {
      userId: localStorage.getItem("user_id"),
      leagueId: user.results._id,
      gameIndex: index,
      winningTeam: user.winningTeam,
      bestScorer: user.bestScorer,
    };
    request(BACKEND_URL, ADD_RANDOM_GAMBLE, variables).then(async (data) => {
      if (data.addRandomGamble.success) {
        await dispatch(
          ResuxSetRandomGame(data.addRandomGamble.user.results.games)
        );
        return toast.success(data.addRandomGamble.message);
      }
      return toast.error(data.addRandomGamble.message);
    });
  };
  const handleRandomGamble = (index: number) => {
    confirmAlert({
      title: `Add random Gamble`,
      message: "Are you sure to do this?",

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            addRandom(index);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="gambling-table">
      {user.results.games &&
        user.results.games.map((match: Game, index: number) => (
          <GambleWrapper key={Math.random()}>
            <GambleUnit width="25%">
              {index < 3 ? (
                //toDo moment how much time passed after the game was played
                <span style={{ color: "#757575" }}>Played</span>
              ) : (
                <>
                  {index === 3 ? (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      Today{" "}
                    </span>
                  ) : (
                    <>{moment(match.eventDate).format("l")}</>
                  )}
                  ({moment(match.eventDate).format("LT")})
                </>
              )}
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
                disabled={index < 3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, index)
                }
              />
              --
              <input
                type="text"
                name="awayTeam"
                style={{ width: "2vmax" }}
                disabled={index < 3}
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
            <GambleButton
              variant="contained"
              color="primary"
              background="blue"
              backgroundhover="rgba(0, 0, 0, 0.12)"
              disabled={index < 3}
              onClick={() => {
                handleRandomGamble(index);
              }}
            >
              Luck Gamble
            </GambleButton>
          </GambleWrapper>
        ))}
    </div>
  );
};

import React, { useEffect, useCallback } from "react";
import moment from "moment";
import { Image } from "../../elements/Image";
import { Game, Team } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import {
  reduxSetUserGames,
  ResuxSetRandomGame,
  reduxSetUser,
} from "../../Features/User/UserSlice";
import { toast } from "react-toastify";
import { GambleButton } from "../../elements/GambleButton";
import { FETCH_USER_RESULT } from "../../queries";
import { useQuery } from "react-apollo";
import { SuccessButton } from "../../elements/SuccessButton";
import { UseGambleMutation } from "../../Hooks/UseGambleMutation";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { UseAddRandomGamble } from "../../Hooks/UseAddRandomGamble";
import "./MatchesGamble.css";
// eslint-disable-next-line
const log = console.log;
const MINIMUM_GAMBLE_NUMBER = 0;
const MAXIMUM_GAMBLE_NUMBER = 10;

export const MatchesGamble = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: "";
          winningTeam: "";
          bestScorer: "";
          results: {
            games: Game[];
            _id: "";
            players: [];
            teams: Team[];
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
    if (
      parseInt(value) > MINIMUM_GAMBLE_NUMBER ||
      parseInt(value) < MAXIMUM_GAMBLE_NUMBER
    ) {
      await dispatch(reduxSetUserGames(index, name, value));
    }
  };

  const { data, loading: loadingUserResults } = useQuery<
    any,
    Record<string, any>
  >(FETCH_USER_RESULT, {
    variables: {
      userId: user._id || (localStorage.getItem("user_id") as string),
    },
  });
  const isResultInitial = useCallback(() => user.results.games.length > 0, [
    user.results.games.length,
  ]);
  useEffect(() => {
    const setUser = async () => {
      await dispatch(reduxSetUser(data.getUser.user));
      toast.success(data.getUser.message);
    };
    if (isResultInitial()) return;
    if (data?.getUser?.success) {
      setUser();
    }
  }, [data, user.results.games.length, dispatch, isResultInitial]);

  const addRandom = async (index: number) => {
    const [data] = await UseAddRandomGamble(user, index);
    if (data.addRandomGamble.success) {
      await dispatch(
        ResuxSetRandomGame(data.addRandomGamble.user.results.games)
      );
      return toast.success(data.addRandomGamble.message);
    }
    return toast.error(data.addRandomGamble.message);
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

  const handleSave = async () => {
    const [data] = await UseGambleMutation(user);
    if (data.addGamble.success) {
      return toast.success(data.addGamble.message);
    }
    return toast.error(data.addGamble.message);
  };
  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
          <div className="gambling-table ">
            {user.results.games.map((match: Game, index: number) => (
              <GambleWrapper key={Math.random()}>
                <GambleUnit width="25%">
                  {index < 3 ? (
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
                  margin="10px 0 10px 0"
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
                  margin="10px 0 10px 0"
                  verticalalign="middle"
                  height="30px"
                  width="30px"
                  src={match.awayTeam.image}
                />

                <GambleUnit width="30%">
                  {" " + match.awayTeam.name}{" "}
                </GambleUnit>
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
          <SuccessButton
            margin="1em auto"
            padding="0.5em"
            onClick={handleSave}
            background="rgb(28, 184, 65)"
          >
            Save
          </SuccessButton>
        </>
      )}
    </>
  );
};

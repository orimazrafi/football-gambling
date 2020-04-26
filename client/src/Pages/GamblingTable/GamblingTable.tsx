import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { Image } from "../../elements/Image";
import { toast } from "react-toastify";
import { Game } from "../../interfaces";
import moment from "moment";
import { GambleWrapper } from "../../elements/GambleWrapper";
import { GambleUnit } from "../../elements/GambleUnit";
import { LoadingText } from "../../elements/LoadingText";
import { SuccessButton } from "../../elements/SuccessButton";
import "./GamblingTable.css";
import { FETCH_USER_RESULT } from "../../queries";
import { ADD_GAMBLE } from "../../mutations";

const log = console.log;
export const GamblingTable = () => {
  const { user } = useSelector(
    (state: { user: { user: { _id: string } } }) => state.user
  );
  const { data, loading: loadingLeague } = useQuery<any, Record<string, any>>(
    FETCH_USER_RESULT,
    {
      variables: {
        userId: user._id || (localStorage.getItem("user_id") as string),
      },
    }
  );

  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    if (!loadingLeague) {
      if (data.getUser.success) {
        setGames(() => data.getUser.user.results.games);
        toast.success(data.getUser.message);
      } else toast.error(data.getUser.message);
    }
  }, [loadingLeague, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let gamesDuplicate = data.getUser.user.results.games;
    if (parseInt(value) > 0 || parseInt(value) < 10) {
      gamesDuplicate[index][name].score = value;
      setGames(() => [...gamesDuplicate]);
    }
  };

  const [addGamble, { loading: loadingForGamble }] = useMutation(ADD_GAMBLE, {
    update(proxy, { data }) {
      if (data.addGamble.success) {
        setGames(() => data.addGamble.user.results.games);
        return toast.success(data.addGamble.message);
      }
      return toast.error(data.addGamble.message);
    },

    variables: {
      userId: localStorage.getItem("user_id"),
      leagueId: data?.getUser?.user?.results?._id,
      results: games,
    },
  });

  const handleSave = () => {
    addGamble();
  };

  return (
    <>
      {data?.getUser?.user.results?.numberOfMathces > 0 && (
        <>
          <span>{data.getUser.user.results.name} League</span>
          {
            <Image
              src={data.getUser.user.results.image}
              alt={data.getUser.user.results.name}
              noboard="unset"
              margin="1em auto 2em auto"
              verticalalign="middle"
              height="60px"
              width="60px"
            />
          }
        </>
      )}

      {loadingLeague ? (
        <LoadingText>Loading League...</LoadingText>
      ) : (
        games?.length > 0 && (
          <div className="gambling-table">
            {loadingForGamble ? (
              <LoadingText>Updating you'r Gamble...</LoadingText>
            ) : (
              games.map((match: Game, index: number) => (
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
                    <input
                      type="text"
                      name="homeTeam"
                      style={{ width: "2vmax" }}
                      value={match.homeTeam.score}
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
                      value={match.awayTeam.score}
                    />
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
                </GambleWrapper>
              ))
            )}
          </div>
        )
      )}
      {!loadingLeague && (
        <SuccessButton margin="1em auto" padding="0.5em" onClick={handleSave}>
          Save
        </SuccessButton>
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useSelector } from "react-redux";

import { Image } from "../../elements/Image";
import { toast } from "react-toastify";
import { Game } from "../../interfaces";
import moment from "moment";
import "./GamblingTable.css";

const log = console.log;
export const GamblingTable = () => {
  const { user } = useSelector(
    (state: { user: { user: { _id: string } } }) => state.user
  );
  log(user);
  const { data, loading: loadingLeague } = useQuery<any, Record<string, any>>(
    FETCH_USER,
    {
      variables: {
        userId: user._id || (localStorage.getItem("user_id") as string),
      },
    }
  );

  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    if (!loadingLeague) {
      setGames(() => data.getUser.results.games);
    }
  }, [loadingLeague, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let gamesDuplicate = data.getUser.results.games;
    if (parseInt(value) > 0 || parseInt(value) < 10) {
      gamesDuplicate[index][name].score = value;
      setGames(() => [...gamesDuplicate]);
    }
  };

  const [addGamble, { loading: loadingForGamble }] = useMutation(ADD_GAMBLE, {
    update(proxy, { data }) {
      log("proxy", proxy);
      setGames(() => data.addGamble.results.games);
      toast.success("you added a gamble");
    },
    onError(err) {
      // setErrors(err.message);
    },

    variables: {
      userId: localStorage.getItem("user_id"),
      leagueId: data?.getUser?.results?._id,
      results: games,
    },
  });

  const handleSave = () => {
    addGamble();
  };

  return (
    <div className="gambling__table__wrapper">
      <div className="gambling__header__league" style={{ textAlign: "center" }}>
        {data?.getUser?.results?.numberOfMathces > 0 && (
          <>
            <span className="league__name">
              {data.getUser.results.name} league
            </span>
            {
              <Image
                src={data.getUser.results.image}
                alt={data.getUser.results.name}
                verticalAign
              />
            }
          </>
        )}
      </div>
      <br />

      {loadingLeague ? (
        <h2>loadingLeague...</h2>
      ) : (
        games?.length > 0 && (
          <div className="gamble__matches__wrapper">
            {loadingForGamble ? (
              <h2>Updating you'r Gamble...</h2>
            ) : (
              games.map((match: Game, index: number) => (
                <div
                  key={Math.random()}
                  className="gamble__single__match__wrapper"
                >
                  <div className="gamble__match__date">
                    {moment(match.eventDate).format("lll")}
                  </div>
                  <div className="team__column">{match.homeTeam.name}</div>
                  <Image src={match.homeTeam.logo} className="flag__column" />

                  <div className="results__colummn">
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
                  </div>
                  <Image src={match.awayTeam.logo} className="flag__column" />
                  <div className="team__column">
                    {" " + match.awayTeam.name}{" "}
                  </div>
                </div>
              ))
            )}
          </div>
        )
      )}
      <div style={{ margin: "1em" }}>
        <button
          className="pure-button pure-button-primary"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const FETCH_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      results {
        _id
        name
        image
        numberOfMathces
        games {
          eventDate
          homeTeam {
            name
            score
            logo
          }
          awayTeam {
            name
            score
            logo
          }
        }
      }
    }
  }
`;

const ADD_GAMBLE = gql`
  mutation addGamble($userId: ID!, $leagueId: ID!, $results: [GameInput]) {
    addGamble(
      gamble: { userId: $userId, leagueId: $leagueId, results: $results }
    ) {
      results {
        name
        image
        numberOfMathces
        games {
          eventDate
          homeTeam {
            name
            score
            logo
          }
          awayTeam {
            name
            score
            logo
          }
        }
      }
    }
  }
`;

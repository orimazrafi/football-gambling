import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Image } from "../../elements/Image";
import { toast } from "react-toastify";

import "./GamblingTable.css";
import moment from "moment";

const log = console.log;
export const GamblingTable = () => {
  const [league, setLeague] = useState<any>([]);
  const { data, loading: loadingLeague } = useQuery<any, Record<string, any>>(
    FETCH_USER,
    {
      variables: { userId: localStorage.getItem("user_id") },
    }
  );
  useEffect(() => {
    if (!loadingLeague) {
      setLeague(() => data.getUser.results);
    }
  }, [loadingLeague]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let matchesResult = league;
    if (parseInt(value) > 0 || parseInt(value) < 10) {
      matchesResult.games[index][name].score = value;
      setLeague(() => ({ ...matchesResult }));
    }
  };

  const [addGamble, { loading: loadingForGamble }] = useMutation(ADD_GAMBLE, {
    update(proxy, { data }) {
      log("proxy", proxy);
      setLeague(() => data.addGamble.results);
      toast.success("you added a gamble");
    },
    onError(err) {
      // setErrors(err.message);
    },
    //  let id = localStorage.getItem("user_id");

    variables: {
      userId: localStorage.getItem("user_id"),
      leagueId: league._id,
      results: league.games,
    },
  });

  const handleSave = () => {
    addGamble();
  };

  return (
    <div className="gambling__table__wrapper">
      <div className="gambling__header__league" style={{ textAlign: "center" }}>
        {league?.numberOfMathces > 0 && (
          <>
            <span className="league__name">{league.name} league</span>
            {<Image src={league.image} alt={league.name} verticalAign />}
          </>
        )}
      </div>
      <br />

      {loadingLeague ? (
        <h2>loadingLeague...</h2>
      ) : (
        league?.games?.length > 0 && (
          <div className="gamble__matches__wrapper">
            {loadingForGamble ? (
              <h2>Updating you'r Gamble...</h2>
            ) : (
              league.games.map((match: any, index: number) => (
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

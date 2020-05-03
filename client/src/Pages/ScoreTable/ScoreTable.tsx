import React, { useEffect, useCallback, useState } from "react";
import { Image } from "../../elements/Image";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
// import { Group } from "../../interfaces";
// import { User } from "../../interfaces";
import { ScoreRow } from "../../elements/ScoreRow";
import { ScoreItem } from "../../elements/ScoreItem";
import { LoadingText } from "../../elements/LoadingText";
import { Container } from "@material-ui/core";
import { FETCH_USER_GROUP_LEAGUE_RESULTS } from "../../queries";
import "./ScoreTable.css";
import * as R from "ramda";
// eslint-disable-next-line
const log = console.log;
// interface Data {
//   group: Group;
// }

export const ScoreTable = () => {
  const history = useHistory();
  const { data, loading: loadingTable } = useQuery<any, Record<string, any>>(
    FETCH_USER_GROUP_LEAGUE_RESULTS,
    {
      variables: {
        groupId: history.location.state,
        userId: localStorage.getItem("user_id"),
      },
    }
  );

  const [userScore, setUserScore] = useState<any>([]);
  const [score, setScore] = useState<any>();
  const checkForGamble = useCallback(
    (user: any, id: string) => {
      let userScore: any = [];
      user.games.forEach((u: any, index: number) => {
        let userHome = parseInt(u.homeTeam.score);
        let userAway = parseInt(u.awayTeam.score);
        let leagueHome = parseInt(
          data.group.league.games[index].homeTeam.score
        );
        let leagueAway = parseInt(
          data.group.league.games[index].awayTeam.score
        );
        let results = { id, userHome, userAway, leagueHome, leagueAway };
        if (leagueHome === leagueAway) userScore.push(handleTieGame(results));
        if (leagueHome > leagueAway) userScore.push(homeTeamWins(results));
        if (leagueAway > leagueHome) userScore.push(awayTeamWins(results));
      });
      setUserScore((pre: any) => [...pre, ...userScore]);
    },

    [data]
  );
  const [order, setOrder] = useState<any>([]);
  useEffect(() => {
    let userScoreDuplicate = userScore;
    let reduceUserScoreById = userScoreDuplicate.reduce(
      (acc: any, cur: any) => {
        const key = cur.id;
        if (acc[key]) {
          acc[key].score += cur.score;
          if (cur.name === "bullseye") {
            acc[key].bullseye
              ? (acc[key].bullseye += 1)
              : (acc[key].bullseye = 1);
          }
        } else {
          acc[key] = { score: cur.score, bullseye: 0 };
          if (cur.name === "bullseye") {
            acc[key].bullseye = 1;
          }
        }
        return acc;
      },
      {}
    );
    const reduceScoreAndIdArray = Object.keys(reduceUserScoreById).map(
      (sortedKey) => {
        return { id: sortedKey, ...reduceUserScoreById[sortedKey] };
      }
    );
    const sortedArray = [...reduceScoreAndIdArray].sort((a: any, b: any) => {
      let af = a.score;
      let bf = b.score;
      let as = a.bullseye;
      let bs = b.bullseye;

      if (af === bf) {
        return as < bs ? 1 : as > bs ? -1 : 0;
      } else {
        return af < bf ? 1 : -1;
      }
    });
    const sortedUserId = [...sortedArray].map((a) => a.id);
    setOrder(sortedUserId);
    setScore(reduceUserScoreById);
    setLoadingScore(false);
  }, [userScore]);
  const handleTieGame = (results: any) => {
    if (results.userHome === results.userAway) {
      return results.userHome === results.leagueHome
        ? { id: results.id, score: 3, name: "bullseye" }
        : { id: results.id, score: 1, name: "direction" };
    } else {
      return { id: results.id, score: 0, name: "none" };
    }
  };
  const homeTeamWins = (results: any) => {
    if (results.userHome > results.userAway) {
      return results.leagueHome === results.userHome &&
        results.leagueAway === results.userAway
        ? { id: results.id, score: 3, name: "bullseye" }
        : { id: results.id, score: 1, name: "direction" };
    } else {
      return { id: results.id, score: 0, name: "none" };
    }
  };
  const awayTeamWins = (results: any) => {
    if (results.userAway > results.userHome) {
      return results.leagueHome === results.userHome &&
        results.leagueAway === results.leagueHome
        ? { id: results.id, score: 3, name: "bullseye" }
        : { id: results.id, score: 1, name: "direction" };
    } else {
      return { id: results.id, score: 0, name: "none" };
    }
  };
  const mergeGamble = useCallback(
    (users: any) => {
      users.forEach((user: any) => {
        checkForGamble(user, user.id);
      });
    },
    [checkForGamble]
  );
  const [loadingScore, setLoadingScore] = useState(true);
  useEffect(() => {
    setLoadingScore(true);
    let users: any = [];
    data?.group?.users.forEach((user: any) => {
      users.push({ games: user.results.games.slice(0, 3), id: user._id });
    });
    mergeGamble(users);
  }, [data, mergeGamble]);

  const handleClick = (
    gambler: any,
    group: any,
    score: number,
    bullseye: number
  ) => {
    history.push("/opponents", { gambler, group, score, bullseye });
  };
  const handleClass = (index: number) => {
    let className = "0";
    if (index === 0) className = "10px 10px 0 0";
    if (data?.group?.users && index === data.group.users.length - 1)
      className = "0 0 10px 10px";
    if (
      index === 0 &&
      data?.group?.users &&
      index === data.group.users.length - 1
    )
      className = "10px";
    return className;
  };

  return (
    <>
      <h2>{data?.group?.name}</h2>
      {data?.group?.image && (
        <Image
          src={`${process.env.REACT_APP_CLOUDINARY_IMAGE}${data?.group?.image}`}
          alt={data?.group?.name}
          noboard="unset"
          margin="1em auto 2em auto"
          verticalalign="middle"
          height="100px"
          width="100px"
        />
      )}
      {loadingTable ? (
        <LoadingText>loading Table...</LoadingText>
      ) : (
        !loadingScore && (
          <Container className="container">
            {order.length > 0 &&
              R.sortBy(R.pipe(R.prop("_id"), R.indexOf(R.__, order) as any))(
                data?.group?.users
              ).map((gambler: any, index: number) => {
                return (
                  <ScoreRow
                    className="item"
                    borderradius={handleClass(index)}
                    key={gambler._id}
                    onClick={() => {
                      handleClick(
                        gambler,
                        data.group,
                        score[gambler._id]?.score,
                        score[gambler._id]?.bullseye
                      );
                    }}
                  >
                    <div>{index + 1}.</div>
                    <Image
                      noboard="1px solid black"
                      margin="0"
                      verticalalign="unset"
                      height="30px"
                      width="30px"
                      src={gambler.image}
                    />
                    <ScoreItem>{gambler.name}</ScoreItem>
                    <ScoreItem>
                      {" "}
                      {Number(
                        score[gambler._id]?.score /
                          (gambler?.results?.games?.slice(0, 3).length * 3)
                      ).toFixed(2)}
                      %
                    </ScoreItem>
                    <ScoreItem>
                      Bullseye {score[gambler._id]?.bullseye}
                    </ScoreItem>
                    <ScoreItem>{score[gambler._id]?.score}</ScoreItem>
                  </ScoreRow>
                );
              })}
          </Container>
        )
      )}
    </>
  );
};

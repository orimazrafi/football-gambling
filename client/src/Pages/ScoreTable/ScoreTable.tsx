import React, { useEffect, useCallback, useState } from "react";
import { Image } from "../../elements/Image";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { ScoreRow } from "../../elements/ScoreRow";
import { ScoreItem } from "../../elements/ScoreItem";
import { LoadingText } from "../../elements/LoadingText";
import { Container } from "@material-ui/core";
import { FETCH_USER_GROUP_LEAGUE_RESULTS } from "../../queries";
import "./ScoreTable.css";
import * as R from "ramda";

import { UseSortAndCaculateByPoints } from "../../Hooks/UseSortAndCaculateByPoints";
import { Group, UserScore, UserGames, UserResults } from "../../interfaces";
import { UseCheckForGamble } from "../../Hooks/UseCheckForGamble";
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

  const [userScore, setUserScore] = useState<UserScore[]>([]);
  const [score, setScore] = useState<any>();
  const [order, setOrder] = useState<any>([]);
  useEffect(() => {
    let [sortedUserId, reduceUserScoreById] = UseSortAndCaculateByPoints(
      userScore
    );
    setOrder(sortedUserId);
    setScore(reduceUserScoreById);
    setLoadingScore(false);
  }, [userScore]);

  const mergeGamble = useCallback(
    (users: UserGames[]) => {
      users.forEach((user: UserGames) => {
        const [userScore] = UseCheckForGamble(data, user, user.id);
        setUserScore((pre: UserScore[]) => [...pre, ...userScore]);
      });
    },
    [data]
  );

  const [loadingScore, setLoadingScore] = useState(true);
  useEffect(() => {
    setLoadingScore(true);
    let users: UserGames[] = [];
    data?.group?.users.forEach((user: UserResults) => {
      users.push({ games: user.results.games.slice(0, 3), id: user._id });
    });
    mergeGamble(users);
  }, [data, mergeGamble]);

  const handleClick = (
    gambler: UserResults,
    group: Group,
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

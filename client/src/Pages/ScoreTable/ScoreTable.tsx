import React, { useState } from "react";
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
import { useSortAndCaculateByPointsAndBullseye } from "../../Hooks/useSortAndCaculateByPointsAndBullseye";
import { Group, UserResults } from "../../interfaces";
import { SuccessButton } from "../../elements/SuccessButton";
import { useHandleStyle } from "../../Hooks/useHandleStyle";
import { useMergeResultsForUpcomingCaculateAndRankingUsers } from "../../Hooks/useMergeResultsForUpcomingCaculateAndRankingUsers";
// eslint-disable-next-line
const log = console.log;
const MAXIMUM_POINTS_PER_GAME = 3;
const NUMBER_TO_MAKE_WHOLE_PERCENTAGE = 100;
export const ScoreTable = () => {
  const history: any = useHistory();
  // const { groupId } = history?.location?.state;
  const {
    data,
    loading: loadingTable,
  }: {
    data: {
      group: {
        _id: string;
        name: string;
        image: string;
        users: any;
        chat: any;
        results: any;
        league: any;

        password: any;
        limitParticipate: any;
        maxParticipate: any;
      };
    };
    loading: boolean;
  } = useQuery<any, Record<string, any>>(FETCH_USER_GROUP_LEAGUE_RESULTS, {
    variables: {
      groupId: history?.location?.state?.groupId,
      userId: localStorage.getItem("user_id"),
    },
  });
  const [loadingScore, setLoadingScore] = useState(true);
  const { userScore } = useMergeResultsForUpcomingCaculateAndRankingUsers(
    data,
    setLoadingScore
  );

  let { score, order } = useSortAndCaculateByPointsAndBullseye(
    userScore,
    setLoadingScore
  );

  const moveToOpponentsPage = (
    gambler: UserResults,
    group: Group,
    score: number,
    bullseye: number
  ) => {
    history.push("/opponents", { gambler, group, score, bullseye });
  };
  const { borderStylingBasedOnTheIndex } = useHandleStyle(data);

  const handleChat = () => {
    const { _id, chat, users } = data?.group;
    history.push("/chat", { groupId: _id, chat, users });
  };

  return (
    <>
      <SuccessButton
        margin="auto"
        padding="1em"
        background="green"
        onClick={handleChat}
      >
        Group Chat
      </SuccessButton>
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
          <>
            <Container className="container">
              {order.length > 0 &&
                R.sortBy(R.pipe(R.prop("_id"), R.indexOf(R.__, order) as any))(
                  data?.group?.users
                ).map((gambler: any, index: number) => {
                  return (
                    <ScoreRow
                      className="item"
                      borderradius={borderStylingBasedOnTheIndex(index)}
                      key={gambler._id}
                      onClick={() => {
                        moveToOpponentsPage(
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
                          (score[gambler._id]?.score /
                            (gambler?.results?.games?.slice(0, 3).length *
                              MAXIMUM_POINTS_PER_GAME)) *
                            NUMBER_TO_MAKE_WHOLE_PERCENTAGE
                        ).toFixed(0)}
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
          </>
        )
      )}
    </>
  );
};

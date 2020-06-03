import React, { useState } from "react";
import { Image } from "../../elements/Image";
import { useHistory } from "react-router-dom";
import { ScoreRow } from "../../elements/ScoreRow";
import { LoadingText } from "../../elements/LoadingText";
import { Container } from "@material-ui/core";
import * as R from "ramda";
import { useSortAndCaculateByPointsAndBullseye } from "../../Hooks/useSortAndCaculateByPointsAndBullseye";
import { Group, UserResults, HistoryGroupId } from "../../interfaces";
import { SuccessButton } from "../../elements/SuccessButton";
import { useHandleStyle } from "../../Hooks/useHandleStyle";
import { useMergeResultsForUpcomingCaculateAndRankingUsers } from "../../Hooks/useMergeResultsForUpcomingCaculateAndRankingUsers";
import { useFetchUserGroupResults } from "../../Hooks/useFetchUserGroupResults";
import { ScoreTableRowInformation } from "../../Components/ScoreTableRowInformation/ScoreTableRowInformation";
import { userIdFromLocalStorage } from "../../helpers";
import "./ScoreTable.css";

const NOT_IN_THE_GROUP = 0;
export const ScoreTable = () => {
  const history: HistoryGroupId | any = useHistory();
  const { data, loadingUserData } = useFetchUserGroupResults(
    history?.location?.state?.groupId
  );

  const isUserPartOfTheGroup = () => {
    let index = data?.group?.users.findIndex(
      (user: any) => user._id === userIdFromLocalStorage()
    );
    if (index >= NOT_IN_THE_GROUP) return true;
    else return false;
  };
  const [loadingScore, setLoadingScore] = useState(true);
  const { userScore } = useMergeResultsForUpcomingCaculateAndRankingUsers(
    data,
    setLoadingScore
  );
  const { score, order } = useSortAndCaculateByPointsAndBullseye(
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
  const userHasNoGroups = () => {
    if (!loadingUserData && data.group === null)
      return (
        <h1 className="user--has--no--groups">
          You need To join At Least one Group!
        </h1>
      );
    return null;
  };
  return (
    <>
      {isUserPartOfTheGroup() && (
        <SuccessButton
          margin="auto"
          padding="1em"
          background="green"
          onClick={handleChat}
        >
          Group Chat
        </SuccessButton>
      )}

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
      {loadingUserData ? (
        <LoadingText>loading Table...</LoadingText>
      ) : (
        !loadingScore && (
          <>
            <Container className="container">
              {order &&
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
                          score[gambler._id]?.score || 0,
                          score[gambler._id]?.bullseye || 0
                        );
                      }}
                    >
                      <ScoreTableRowInformation
                        index={index}
                        gambler={gambler}
                        score={score}
                      />
                    </ScoreRow>
                  );
                })}
            </Container>
          </>
        )
      )}
      {userHasNoGroups()}
    </>
  );
};

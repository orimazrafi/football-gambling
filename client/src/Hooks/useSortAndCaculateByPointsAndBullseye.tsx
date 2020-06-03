import { useState, useEffect } from "react";

const addBullseye = (acc: any, key: any) => (acc[key].bullseye += 1);
const firstBullseye = (acc: any, key: any) => (acc[key].bullseye = 1);
const startCounting = (cur: any) => ({ score: cur.score, bullseye: 0 });
const sortArrayByScoreAndThenByBullseye = (reduceScoreAndIdArray: any) => {
  return [...reduceScoreAndIdArray].sort((a: any, b: any) => {
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
};

const reduceUserScoreByIdfunction = (userScoreDuplicate: any) => {
  return userScoreDuplicate.reduce((acc: any, cur: any) => {
    const key = cur.id;
    if (acc[key]) {
      acc[key].score += cur.score;
      if (cur.name === "bullseye") {
        acc[key].bullseye ? addBullseye(acc, key) : firstBullseye(acc, key);
      }
    } else {
      acc[key] = startCounting(cur);
      if (cur.name === "bullseye") {
        firstBullseye(acc, key);
      }
    }
    return acc;
  }, {});
};
const sortScoreArrayOnlyById = (sortedArray: any) =>
  [...sortedArray].map((a) => a.id);
const scoredUsersArrayNotSortedFunction = (reduceUserScoreById: any) =>
  Object.keys(reduceUserScoreById).map((sortedKey) => {
    return { id: sortedKey, ...reduceUserScoreById[sortedKey] };
  });
export const useSortAndCaculateByPointsAndBullseye = (
  userScore: any,
  setLoadingScore: any
) => {
  const [score, setScore] = useState<any>();
  const [order, setOrder] = useState<any>([]);
  useEffect(() => {
    const reduceUserScoreById = reduceUserScoreByIdfunction(userScore);
    const scoredUsersArrayNotSorted = scoredUsersArrayNotSortedFunction(
      reduceUserScoreById
    );
    const sortedArray = sortArrayByScoreAndThenByBullseye(
      scoredUsersArrayNotSorted
    );

    let sortedUserId = sortScoreArrayOnlyById(sortedArray);
    setOrder(sortedUserId);
    setScore(reduceUserScoreById);
    setLoadingScore(false);
  }, [userScore, setLoadingScore]);

  return { score, order };
};

export const UseSortAndCaculateByPoints = (userScore: any) => {
  let userScoreDuplicate = userScore;
  let reduceUserScoreById = userScoreDuplicate.reduce((acc: any, cur: any) => {
    const key = cur.id;
    if (acc[key]) {
      acc[key].score += cur.score;
      if (cur.name === "bullseye") {
        acc[key].bullseye ? (acc[key].bullseye += 1) : (acc[key].bullseye = 1);
      }
    } else {
      acc[key] = { score: cur.score, bullseye: 0 };
      if (cur.name === "bullseye") {
        acc[key].bullseye = 1;
      }
    }
    return acc;
  }, {});
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
  let sortedUserId = [...sortedArray].map((a) => a.id);
  return [sortedUserId, reduceUserScoreById];
};

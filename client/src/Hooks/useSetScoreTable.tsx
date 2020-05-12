const NUMBERS_AFTER_DOT = 0;
const MAXIMUM_POINTS_PER_GAME = 3;
const NUMBER_TO_MAKE_WHOLE_PERCENTAGE = 100;

export const useSetScoreTable = (
  group: any,
  gambler: any,
  score: number,
  bullseye: number
) => {
  const listItem = [
    {
      src: group.league.image,
      alt: group.league.name,
      primary: group.league.name,
    },
    { src: gambler.image, alt: gambler.name, primary: gambler.name },
    { name: "Score", primary: score, fontSize: "0.8rem" },
    {
      name: "%",
      primary:
        Number(
          (score /
            (gambler.results.games.slice(0, 3).length *
              MAXIMUM_POINTS_PER_GAME)) *
            NUMBER_TO_MAKE_WHOLE_PERCENTAGE
        ).toFixed(NUMBERS_AFTER_DOT) + "%",
      fontSize: "0.8rem",
    },
    { name: "Bullesye", primary: bullseye, fontSize: "0.6rem" },
  ];
  return { listItem };
};

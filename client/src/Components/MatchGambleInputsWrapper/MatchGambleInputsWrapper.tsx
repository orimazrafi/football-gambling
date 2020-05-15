import React from "react";
import { GambleUnit } from "../../elements/GambleUnit";
import { UserWithFullResults } from "../../interfaces";

interface Props {
  user: UserWithFullResults;
  index: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => Promise<void>;
}
export const MatchGambleInputsWrapper = (props: Props) => {
  const { user, index, handleChange } = props;
  return (
    <GambleUnit width="10%">
      <input
        type="text"
        name="homeTeam"
        className="gambling-table__score__input"
        value={user.results.games[index].homeTeam.score}
        disabled={index < 3}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, index)
        }
      />
      --
      <input
        type="text"
        name="awayTeam"
        className="gambling-table__score__input"
        disabled={index < 3}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, index)
        }
        value={user.results.games[index].awayTeam.score}
      />
    </GambleUnit>
  );
};

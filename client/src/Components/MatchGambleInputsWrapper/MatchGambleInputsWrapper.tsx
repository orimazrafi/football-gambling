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
  autoFocus: { index: number; name: string };
}
export const MatchGambleInputsWrapper = (props: Props) => {
  const { user, index, handleChange, autoFocus } = props;

  return (
    <GambleUnit width="15%" textOverflow="unset" display="block">
      <input
        type="text"
        name="homeTeam"
        className="gambling-table__score__input"
        value={user.results.games[index].homeTeam.score}
        disabled={index < 3}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, index)
        }
        autoFocus={autoFocus.index === index && "homeTeam" === autoFocus.name}
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
        autoFocus={autoFocus.index === index && "awayTeam" === autoFocus.name}
      />
    </GambleUnit>
  );
};

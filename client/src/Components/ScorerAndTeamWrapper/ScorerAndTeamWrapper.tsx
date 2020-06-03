import React from "react";

import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";

interface Props {
  array: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  user: any;
  name: string;
}
export const ScorerAndTeamWrapper = (props: Props) => {
  const { array, handleChange, user, name } = props;
  return (
    <div className="gambling-table">
      {array && (
        <div className="gambling-table__icon__wrapper">
          {array.map((playerOrTeam: any) => (
            <IconsGrid
              image={playerOrTeam.image}
              name={playerOrTeam.name}
              teamName={playerOrTeam.team}
              value={user[name]}
              onChange={handleChange}
              key={Math.random()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

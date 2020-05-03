import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";
import { reduxSetTeam } from "../../Features/User/UserSlice";
// eslint-disable-next-line
const log = console.log;
interface Props {
  // teams: any;
  // team: any;
  // onTeamChange: any;
}
export const WinningTeam = (props: Props) => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: {
      user: { user: { _id: string; winningTeam: ""; results: { teams: any } } };
    }) => state.user
  );

  const handleTeamChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await dispatch(reduxSetTeam(value));
  };

  return (
    <div className="gambling-table">
      {user.results.teams && (
        <div
          style={{
            margin: "4em auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridGap: "6rem 0 ",
          }}
        >
          {user.results.teams.map((team: any) => (
            <IconsGrid
              image={team.image}
              name={team.name}
              teamName={""}
              value={user.winningTeam}
              key={Math.random()}
              onChange={handleTeamChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import React from "react";

import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";
import { useSelector, useDispatch } from "react-redux";
import { reduxSetPlayer } from "../../Features/User/UserSlice";
// eslint-disable-next-line
const log = console.log;
export const BestScorer = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: {
      user: {
        user: { _id: string; bestScorer: ""; results: { players: any } };
      };
    }) => state.user
  );
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await dispatch(reduxSetPlayer(value));
  };
  return (
    <div className="gambling-table">
      {user.results.players && (
        <div
          style={{
            margin: "4em auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridGap: "6rem 0 ",
          }}
        >
          {user.results.players.map((player: any) => (
            <IconsGrid
              image={player.image}
              name={player.name}
              teamName={player.team}
              value={user.bestScorer}
              onChange={handleChange}
              key={Math.random()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

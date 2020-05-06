import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";
import { reduxSetTeam, reduxSetUser } from "../../Features/User/UserSlice";
import { useQuery } from "react-apollo";
import { FETCH_USER_RESULT } from "../../queries";
import { toast } from "react-toastify";
import { Game } from "../../interfaces";
import { Team } from "../../interfaces";
import { SuccessButton } from "../../elements/SuccessButton";
import { UseGambleMutation } from "../../Hooks/UseGambleMutation";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
// eslint-disable-next-line
const log = console.log;
export const WinningTeam = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: {
      user: {
        user: {
          bestScorer: "";
          _id: "";
          winningTeam: "";
          results: {
            games: Game[];
            teams: Team[];
            _id: "";
            players: [];
          };
        };
      };
    }) => state.user
  );
  const { data, loading: loadingUserResults } = useQuery<
    any,
    Record<string, any>
  >(FETCH_USER_RESULT, {
    variables: {
      userId: user._id || (localStorage.getItem("user_id") as string),
    },
  });
  useEffect(() => {
    const setUser = async () => {
      await dispatch(reduxSetUser(data.getUser.user));
      toast.success(data.getUser.message);
    };
    if (user.winningTeam !== "") return;
    if (data?.getUser?.success) {
      setUser();
    }
  }, [data, dispatch, user.winningTeam]);
  const handleTeamChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await dispatch(reduxSetTeam(value));
  };

  const handleSave = async () => {
    const [data] = await UseGambleMutation(user);
    if (data.addGamble.success) {
      return toast.success(data.addGamble.message);
    }
    return toast.error(data.addGamble.message);
  };
  return (
    <>
      {loadingUserResults ? (
        <LoadingGif loading={loadingUserResults} size={150} />
      ) : (
        <>
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
          <SuccessButton
            margin="1em auto"
            padding="0.5em"
            onClick={handleSave}
            background="rgb(28, 184, 65)"
          >
            Save
          </SuccessButton>
        </>
      )}
    </>
  );
};

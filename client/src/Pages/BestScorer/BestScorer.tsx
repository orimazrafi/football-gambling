import React, { useEffect } from "react";
import { IconsGrid } from "../../Components/IconsGrid/IconsGrid";
import { useSelector, useDispatch } from "react-redux";
import { reduxSetPlayer, reduxSetUser } from "../../Features/User/UserSlice";
import { useQuery } from "react-apollo";
import { FETCH_USER_RESULT } from "../../queries";
import { toast } from "react-toastify";
import { SuccessButton } from "../../elements/SuccessButton";
import { Game, Team } from "../../interfaces";
import { UseGambleMutation } from "../../Hooks/UseGambleMutation";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
// eslint-disable-next-line
const log = console.log;
export const BestScorer = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: "";
          winningTeam: "";
          bestScorer: "";
          results: {
            games: Game[];
            _id: "";
            players: [];
            teams: Team[];
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
    if (user.bestScorer !== "") return;
    if (data?.getUser?.success) {
      setUser();
    }
  }, [data, dispatch, user.bestScorer]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    await dispatch(reduxSetPlayer(value));
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

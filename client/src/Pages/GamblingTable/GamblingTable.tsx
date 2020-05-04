import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { LoadingText } from "../../elements/LoadingText";
import { SuccessButton } from "../../elements/SuccessButton";
import { FETCH_USER_RESULT } from "../../queries";
import { ADD_GAMBLE } from "../../mutations";
import { reduxSetUser } from "../../Features/User/UserSlice";
import "./GamblingTable.css";
import { TabsWrapper } from "../../Components/TabsWrapper/TabsWrapper";
// eslint-disable-next-line
const log = console.log;

export const GamblingTable = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: string;
          winningTeam: "";
          bestScorer: "";
          results: { _id: ""; games: [] };
        };
      };
    }) => state.user
  );

  const { data, loading: loadingLeague } = useQuery<any, Record<string, any>>(
    FETCH_USER_RESULT,
    {
      variables: {
        userId: user._id || (localStorage.getItem("user_id") as string),
      },
    }
  );

  useEffect(() => {
    const setUser = async () => {
      await dispatch(reduxSetUser(data.getUser.user));
      toast.success(data.getUser.message);
    };
    if (!loadingLeague) {
      if (data?.getUser?.success) {
        setUser();
      }
    }
  }, [loadingLeague, data, dispatch]);

  const [addGamble, { loading: loadingForGamble }] = useMutation(ADD_GAMBLE, {
    update(proxy, { data }) {
      if (data.addGamble.success) {
        return toast.success(data.addGamble.message);
      }
      return toast.error(data.addGamble.message);
    },
    variables: {
      userId: localStorage.getItem("user_id"),
      leagueId: user.results._id,
      results: user.results.games,
      winningTeam: user.winningTeam,
      bestScorer: user.bestScorer,
    },
  });

  const handleSave = () => {
    addGamble();
  };

  const [tab, setTab] = React.useState(1);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  return (
    <>
      {loadingLeague || loadingForGamble ? (
        <LoadingText>Loading League...</LoadingText>
      ) : (
        <TabsWrapper value={tab} onTabChange={handleTabChange} />
      )}
      {!loadingLeague && !loadingForGamble && (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <SuccessButton
            margin="1em 0"
            padding="0.5em"
            onClick={handleSave}
            background="rgb(28, 184, 65)"
          >
            Save
          </SuccessButton>
        </div>
      )}
    </>
  );
};

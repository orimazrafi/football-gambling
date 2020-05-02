import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Game } from "../../interfaces";

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
      log(data);
      await dispatch(reduxSetUser(data.getUser.user));
      toast.success(data.getUser.message);
    };
    if (!loadingLeague) {
      if (data?.getUser?.success) {
        setUser();
      }
    }
  }, [loadingLeague, data]);

  const [addGamble, { loading: loadingForGamble }] = useMutation(ADD_GAMBLE, {
    update(proxy, { data }) {
      if (data.addGamble.success) {
        // setGames(() => data.addGamble.user.results.games);
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
    log(user.results);
  };

  const [tab, setTab] = React.useState(0);
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
        <>
          <SuccessButton margin="1em auto" padding="0.5em" onClick={handleSave}>
            Save
          </SuccessButton>
        </>
      )}
    </>
  );
};

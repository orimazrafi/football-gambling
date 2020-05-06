import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { LoadingText } from "../../elements/LoadingText";
import { ScorePopover } from "../../Components/ScorePopover/ScorePopover";
import { OpponentsTable } from "../../Components/OpponentsTable/OpponentsTable";
import { Container } from "../../elements/Container";
import "./Opponents.css";
import { useDispatch } from "react-redux";
import { reduxSetOpponent } from "../../Features/User/UserSlice";
// eslint-disable-next-line
const log = console.log;

export const Opponents = () => {
  const dispatch = useDispatch();
  const history: any = useHistory();
  const { group, gambler, score, bullseye } = history.location.state;

  const setOpponent = useCallback(async () => {
    await dispatch(reduxSetOpponent(gambler.name, gambler.image));
  }, [dispatch, gambler]);
  useEffect(() => {
    setOpponent();
  }, [history, setOpponent]);

  return (
    <>
      <Container width="100%" margin="2em auto 0 auto">
        {!history?.location?.state.group ? (
          <LoadingText>Loading user Gamble...</LoadingText>
        ) : (
          <Container width="90%" margin="auto">
            <ScorePopover
              group={group}
              gambler={gambler}
              score={score}
              bullseye={bullseye}
            />
            <OpponentsTable gambler={gambler} group={group} />
          </Container>
        )}
      </Container>
    </>
  );
};

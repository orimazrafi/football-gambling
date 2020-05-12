import React from "react";
import { useHistory } from "react-router-dom";
import { LoadingText } from "../../elements/LoadingText";
import { ScorePopover } from "../../Components/ScorePopover/ScorePopover";
import { OpponentsTable } from "../../Components/OpponentsTable/OpponentsTable";
import { Container } from "../../elements/Container";
import { useSetInitialOpponent } from "../../Hooks/useSetInitialOpponent";
import "./Opponents.css";
// eslint-disable-next-line
const log = console.log;

export const Opponents = () => {
  const history: any = useHistory();
  const { group, gambler, score, bullseye } = history.location.state;
  useSetInitialOpponent(gambler, history);

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

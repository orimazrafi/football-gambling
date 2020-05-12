import React from "react";
import { ScoreList } from "../../Components/ScoreList/ScoreList";
import Popover from "@material-ui/core/Popover";
import { PrimaryButton } from "../../elements/PrimaryButton";
import { GroupUsersAndLeague, UserResults } from "../../interfaces";
import { usePopover } from "../../Hooks/usePopover";
interface Props {
  group: GroupUsersAndLeague;
  gambler: UserResults;
  score: number;
  bullseye: number;
}
export const ScorePopover = (props: Props) => {
  const { group, gambler, score, bullseye } = props;

  const { open, anchorEl, handleClose, handleClick } = usePopover();
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <PrimaryButton
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
        margin="0 auto 2em auto"
      >
        Score Details
      </PrimaryButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ScoreList
          group={group}
          gambler={gambler}
          score={score}
          bullseye={bullseye}
        />
      </Popover>
    </>
  );
};

import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { PrimaryButton } from "../../elements/PrimaryButton";
import { GroupModal } from "../GroupModal/GroupModal";
import { FETCH_LEAGUES } from "../../queries";
import "./CreateGroup.css";
import { useCreateGroup } from "../../Hooks/useCreateGroup";

const NOT_IN_THE_ARRAY = -1;
// eslint-disable-next-line
const log = console.log;
interface Data {
  leagues: League[];
}
interface League {
  _id: string;
  name: string;
  label?: string;
}
export const CreateGroup = () => {
  let { data, loading: loadingLeagues } = useQuery<
    Data,
    Record<string, boolean>
  >(FETCH_LEAGUES);
  const haveSelectOption = () => {
    let index = data?.leagues.findIndex(
      (league: League) => league.name === "Choose A League"
    );
    if (index === NOT_IN_THE_ARRAY) return false;
    else return true;
  };

  if (!haveSelectOption()) {
    data?.leagues.unshift({ _id: "", name: "Choose A League" });
  }
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { handleSubmit, loadingCreateGroup, errors } = useCreateGroup(setOpen);

  return (
    <>
      <PrimaryButton
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        margin="0"
      >
        Add Group
      </PrimaryButton>
      <GroupModal
        open={open}
        onClose={handleClose}
        errors={errors}
        onSubmit={handleSubmit}
        loadingLeagues={loadingLeagues}
        data={data}
        loadingCreateGroup={loadingCreateGroup}
      />
    </>
  );
};

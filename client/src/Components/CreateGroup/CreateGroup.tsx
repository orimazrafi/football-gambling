import React from "react";

import { PrimaryButton } from "../../elements/PrimaryButton";
import { GroupModal } from "../GroupModal/GroupModal";
import { useCreateGroup } from "../../Hooks/useCreateGroup";
import { useFetchLeaguesForSelectBox } from "../../Hooks/useFetchLeaguesForSelectBox";
import "./CreateGroup.css";
import { useCreateGroupModalOpenAndClose } from "../../Hooks/useCreateGroupModalOpenAndClose";

const NOT_IN_THE_ARRAY = -1;
// eslint-disable-next-line
const log = console.log;

interface League {
  _id: string;
  name: string;
  label?: string;
}
export const CreateGroup = () => {
  let { data, loadingLeagues } = useFetchLeaguesForSelectBox();

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

  let {
    open,
    handleClickOpen,
    handleClose,
    setOpen,
  } = useCreateGroupModalOpenAndClose();
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

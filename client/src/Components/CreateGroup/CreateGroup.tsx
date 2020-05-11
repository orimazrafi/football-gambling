import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { request } from "graphql-request";
import { toast } from "react-toastify";
import { reduxSetGroup } from "../../Features/Group/GroupSlice";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "../../elements/PrimaryButton";
import { GroupModal } from "../GroupModal/GroupModal";
import { imageIcon, defualtImage, BACKEND_URL } from "../../helpers";
import { FETCH_LEAGUES } from "../../queries";
import { CREATE_GROUP } from "../../mutations";
import "./CreateGroup.css";

const NOT_IN_THE_ARRAY = -1;
// eslint-disable-next-line
const log = console.log;
interface Data {
  leagues: League[];
}
interface League {
  _id: string;
  name: string;
  label?: any;
}
export const CreateGroup = () => {
  let { data, loading: loadingLeagues } = useQuery<Data, Record<string, any>>(
    FETCH_LEAGUES
  );
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

  const handleSubmit = (data: any, image: string) => {
    let group = {
      name: data.name,
      password: data.password,
      limitParticipate: data.limitParticipate,
      maxParticipate: data.maxParticipate,
      admin: localStorage.getItem("user_id") as string,
      image: image === imageIcon ? defualtImage : image,
      league: data.league,
    };
    createGroup(group);
  };

  const [loadingCreateGroup, setLoadingCreateGroup] = useState(false);

  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();
  const createGroup = (group: any) => {
    setLoadingCreateGroup(true);
    const variables = { ...group };
    request(BACKEND_URL, CREATE_GROUP, variables).then(async (data) => {
      try {
        if (!data.createGroup.success) {
          setLoadingCreateGroup(false);
          return setErrors(data.createGroup.message);
        }

        await dispatch(reduxSetGroup(data.createGroup.group));
        toast.success("Group was Added");
        setOpen(false);
        setLoadingCreateGroup(false);
      } catch (err) {
        setLoadingCreateGroup(false);
        setErrors(data.createGroup.message);
        toast.success(data.createGroup.message);
      }
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

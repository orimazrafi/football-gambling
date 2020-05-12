import { toast } from "react-toastify";
import { request } from "graphql-request";
import { useDispatch } from "react-redux";
import { reduxSetGroup } from "../Features/Group/GroupSlice";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../elements/GroupCell";
import { BACKEND_URL } from "../helpers";
import { TableBody } from "@material-ui/core";
import { ADD_USER_TO_GROUP } from "../mutations";
import { GroupInput } from "../interfaces";
import { useState, useEffect } from "react";
export const useAddUserToGroupWithPassword = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(true);
  setModal(true);
  const [loadingAddUserToGroup, setLoadingAddUserToGroup] = useState(false);

  const addUserToGroup = (group: GroupInput) => {
    setLoadingAddUserToGroup(true);
    const variables = {
      userId: localStorage.getItem("user_id") as string,
      groupId: group.groupId,
      groupPassword: group.password,
    };
    request(BACKEND_URL, ADD_USER_TO_GROUP, variables).then(async (data) => {
      try {
        if (!data.addUserToGroup.success) {
          setLoadingAddUserToGroup(false);
          return toast.error(data.addUserToGroup.message);
        }
        await dispatch(reduxSetGroup(data.addUserToGroup.group));
        // setModalIsOpen(false);
        setModal(false);

        toast.success("You were added to the group!");
        setLoadingAddUserToGroup(false);
      } catch (ex) {
        toast.error(ex.message);
        setLoadingAddUserToGroup(false);
      }
    });
  };

  return { addUserToGroup, loadingAddUserToGroup, modal };
};

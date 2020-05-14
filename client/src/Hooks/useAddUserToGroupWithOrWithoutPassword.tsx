import { toast } from "react-toastify";
import { useState } from "react";
import { JoinGroupDetails } from "../interfaces";
import { request } from "graphql-request";
import { useDispatch } from "react-redux";
import { reduxSetGroup } from "../Features/Group/GroupSlice";
import { BACKEND_URL } from "../helpers";
import { ADD_USER_TO_GROUP } from "../mutations";

export const useAddUserToGroupWithOrWithoutPassword = (
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [loadingAddUserToGroup, setLoadingAddUserToGroup] = useState(false);
  const dispatch = useDispatch();

  const addUserToGroup = (group: JoinGroupDetails) => {
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
        setModalIsOpen(false);
        toast.success("You were added to the group!");
        setLoadingAddUserToGroup(false);
      } catch (ex) {
        toast.error(ex.message);
        setLoadingAddUserToGroup(false);
      }
    });
  };
  return { addUserToGroup, loadingAddUserToGroup };
};

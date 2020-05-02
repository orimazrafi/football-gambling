import React, { useState } from "react";
import { Group } from "../../interfaces";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { request } from "graphql-request";
import { useDispatch } from "react-redux";
import { reduxSetGroup } from "../../Features/Group/GroupSlice";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { PasswordModal } from "../PasswordModal.tsx/PasswordModal";
import { GroupsTableRow } from "../GroupsTableRow/GroupsTableRow";
import { BACKEND_URL } from "../../helpers";
import { TableBody } from "@material-ui/core";
import { ADD_USER_TO_GROUP } from "../../mutations";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./GroupsBody.css";

// eslint-disable-next-line
const log = console.log;

export const GroupsBody: React.FC<{
  auth: any;
  groups: Group[];
}> = ({ auth, groups }) => {
  const [groupInput, setGroupInput] = useState({
    name: "",
    userId: "",
    groupId: "",
    password: "",
    image: "",
  });
  const [resetModal, setResetModal] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleJoinGroupWithPasssword = (groupInput: any) => {
    setGroupInput((prev: any) => ({
      ...prev,
      name: groupInput.name,
      groupId: groupInput.groupId,
      password: groupInput.password,
      image: groupInput.image,
    }));
    setModalIsOpen(true);
    setResetModal(true);
  };
  const handleclose = () => {
    setModalIsOpen(false);
    setResetModal(false);
  };
  const handleJoinGroupWithOutPasssword = (group: any) => {
    confirmAlert({
      title: `Join the ${group.name}`,
      message: "Are you sure to do this?",

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            addUserToGroup(group);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const dispatch = useDispatch();
  const [loadingAddUserToGroup, setLoadingAddUserToGroup] = useState(false);
  const addUserToGroup = (group: any) => {
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

  return (
    <TableBody>
      {loadingAddUserToGroup ? (
        <TableRow>
          <GroupCell fontSize="1em" fontWeight="bold" textoverflow="unset">
            loading Add User To Group...
          </GroupCell>
        </TableRow>
      ) : (
        groups?.map((group: Group) => (
          <GroupsTableRow
            key={Math.random()}
            group={group}
            onJoinGroupWithPasssword={handleJoinGroupWithPasssword}
            onJoinGroupWithOutPasssword={handleJoinGroupWithOutPasssword}
          />
        ))
      )}
      <>
        <PasswordModal
          onClose={handleclose}
          modalIsOpen={modalIsOpen}
          groupInput={groupInput}
          auth={auth}
          onaddUser={addUserToGroup}
          resetModal={resetModal}
        />
      </>
    </TableBody>
  );
};

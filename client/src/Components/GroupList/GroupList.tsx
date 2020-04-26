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
import { GroupTableBody } from "../GroupTableBody/GroupTableBody";
import { TableBody } from "@material-ui/core";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./GroupList.css";
import { BACKEND_URL } from "../../helpers";

// eslint-disable-next-line
const log = console.log;

export const GroupList: React.FC<{
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
          <GroupCell fontSize="1em" fontWeight="bold">
            loading Add User To Group...
          </GroupCell>
        </TableRow>
      ) : (
        groups?.map((group: Group) => (
          <GroupTableBody
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
const ADD_USER_TO_GROUP = `
  mutation addUserToGroup($userId: ID!, $groupId: ID!, $groupPassword: String) {
    addUserToGroup(
      userToGroup: {
        userId: $userId
        groupId: $groupId
        groupPassword: $groupPassword
      }
    ) {
      success
      message
      group{
        _id
      admin
      name
      maxParticipate
      image
      password
      users {
        _id
        name
      }
    }
    }
  }
`;
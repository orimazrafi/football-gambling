import React from "react";
import { Group, JoinGroupDetails } from "../../interfaces";
import { confirmAlert } from "react-confirm-alert";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { PasswordModal } from "../PasswordModal.tsx/PasswordModal";
import { GroupsTableRow } from "../GroupsTableRow/GroupsTableRow";
import { TableBody } from "@material-ui/core";
import { AuthLogout } from "../../interfaces";
import { useHandleGroupModalWithPassword } from "../../Hooks/useHandleGroupModalWithPassword";
import { useAddUserToGroupWithOrWithoutPassword } from "../../Hooks/useAddUserToGroupWithOrWithoutPassword";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./GroupsBody.css";

interface Props {
  auth: AuthLogout;
  groups: Group[];
}
export const GroupsBody = (props: Props) => {
  const { auth, groups } = props;
  const {
    OpenGroupPasswordModal,
    groupInput,
    handleclose,
    modalIsOpen,
    setModalIsOpen,
    resetModal,
  } = useHandleGroupModalWithPassword();
  const OpenAlertGroup = (group: JoinGroupDetails) => {
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

  const {
    addUserToGroup,
    loadingAddUserToGroup,
  } = useAddUserToGroupWithOrWithoutPassword(setModalIsOpen);

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
            onJoinGroupWithPasssword={OpenGroupPasswordModal}
            onJoinGroupWithOutPasssword={OpenAlertGroup}
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

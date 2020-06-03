import React from "react";
import { Group } from "../../interfaces";
import { User, JoinGroupDetails } from "../../interfaces";
import { useHistory } from "react-router-dom";
import { GroupCell } from "../../elements/GroupCell";
import { TableButton } from "../../elements/TableButton";
import { userIdFromLocalStorage } from "../../helpers";
interface Props {
  group: Group;
  onJoinGroupWithPasssword: (groupInput: JoinGroupDetails) => void;
  onJoinGroupWithOutPasssword: (groupInput: JoinGroupDetails) => void;
}
const NOT_FOUND = -1;
export const GroupsViewAndJoinButtons = (props: Props) => {
  const {
    group,
    onJoinGroupWithPasssword,
    onJoinGroupWithOutPasssword,
  } = props;
  const history = useHistory();

  return (
    <GroupCell fontSize="12px" fontWeight="normal" textoverflow="ellipsis">
      {group.users &&
      group.maxParticipate &&
      group.users.findIndex(
        (user: User) => user._id === userIdFromLocalStorage()
      ) === NOT_FOUND &&
      group.users.length < group.maxParticipate ? (
        group.password ? (
          <TableButton
            variant="contained"
            color="primary"
            background="#0000ff"
            backgroundhover="#3f51b5"
            onClick={() => {
              let groupInput = {
                name: group.name,
                groupId: group._id,
                password: group.password,
                image: group.image,
              };
              onJoinGroupWithPasssword(groupInput);
            }}
          >
            Join
          </TableButton>
        ) : (
          <TableButton
            variant="contained"
            color="primary"
            background="blue"
            backgroundhover="rgba(0, 0, 0, 0.12)"
            onClick={() => {
              let groupInput = {
                name: group.name,
                groupId: group._id,
                password: group.password,
                image: group.image,
              };
              onJoinGroupWithOutPasssword(groupInput);
            }}
          >
            Join
          </TableButton>
        )
      ) : (
        <TableButton
          variant="contained"
          background="rgba(0, 0, 0, 0.12)"
          backgroundhover="rgba(0, 0, 0, 0.12)"
          disabled
        >
          Join
        </TableButton>
      )}
      <TableButton
        background="rgb(28, 184, 65)"
        backgroundhover="rgb(5, 236, 60)"
        onClick={() => history.push("/score", { groupId: group._id })}
      >
        View
      </TableButton>
    </GroupCell>
  );
};

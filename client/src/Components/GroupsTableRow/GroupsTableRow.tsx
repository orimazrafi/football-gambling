import React from "react";
import { Group } from "../../interfaces";
import { Image } from "../../elements/Image";
import { User } from "../../interfaces";
import { useHistory } from "react-router-dom";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { TableButton } from "../../elements/TableButton";
import { cloudinaryImageUrl } from "../../helpers";

interface Props {
  group: Group;
  onJoinGroupWithPasssword: (groupInput: any) => void;
  onJoinGroupWithOutPasssword: (groupInput: any) => void;
}
export const GroupsTableRow = (props: Props) => {
  const history = useHistory();

  const {
    group,
    onJoinGroupWithPasssword,
    onJoinGroupWithOutPasssword,
  } = props;
  return (
    <TableRow key={group._id}>
      <GroupCell fontSize="12px" fontWeight="normal" textoverflow="ellipsis">
        <Image
          src={`${cloudinaryImageUrl}${group.image}`}
          alt={group.name}
          noboard="unset"
          margin="auto"
          verticalalign="middle"
          height="30px"
          width="30px"
        />
      </GroupCell>
      <GroupCell fontSize="12px" fontWeight="normal" textoverflow="ellipsis">
        {" "}
        {group.name}
      </GroupCell>
      <GroupCell fontSize="12px" fontWeight="normal" textoverflow="ellipsis">
        {group.users && group.users[0].name}
      </GroupCell>
      <GroupCell fontSize="12px" fontWeight="normal" textoverflow="ellipsis">
        {" "}
        {group.password ? "******" : "None"}
      </GroupCell>
      <GroupCell fontSize="12px" fontWeight="normal" textoverflow="ellipsis">
        {group.users && ` ${group.users.length}/${group.maxParticipate}`}
      </GroupCell>
      <GroupCell fontSize="12px" fontWeight="normal" textoverflow="ellipsis">
        {group.users &&
        group.maxParticipate &&
        group.users.findIndex(
          (user: User) =>
            user._id === (localStorage.getItem("user_id") as string)
        ) === -1 &&
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
    </TableRow>
  );
};

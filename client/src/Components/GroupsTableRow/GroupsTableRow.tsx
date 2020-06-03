import React from "react";
import { Group } from "../../interfaces";
import { Image } from "../../elements/Image";
import { JoinGroupDetails } from "../../interfaces";
import TableRow from "@material-ui/core/TableRow";
import { GroupCell } from "../../elements/GroupCell";
import { cloudinaryImageUrl } from "../../helpers";
import { GroupsViewAndJoinButtons } from "../GroupsViewAndJoinButtons/GroupsViewAndJoinButtons";

interface Props {
  group: Group;
  onJoinGroupWithPasssword: (groupInput: JoinGroupDetails) => void;
  onJoinGroupWithOutPasssword: (groupInput: JoinGroupDetails) => void;
}
export const GroupsTableRow = (props: Props) => {
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
      <GroupsViewAndJoinButtons
        group={group}
        onJoinGroupWithPasssword={onJoinGroupWithPasssword}
        onJoinGroupWithOutPasssword={onJoinGroupWithOutPasssword}
      />
    </TableRow>
  );
};

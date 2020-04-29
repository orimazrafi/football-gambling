import React from "react";
import { GroupCell } from "../../elements/GroupCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
interface Props {
  columns: any;
}
export const GenericTableHead = (props: Props) => {
  const { columns } = props;
  return (
    <TableHead>
      <TableRow>
        {columns.map((head: string) => (
          <GroupCell
            key={Math.random()}
            fontSize="1em"
            fontWeight="bold"
            textoverflow="unset"
          >
            {head}
          </GroupCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

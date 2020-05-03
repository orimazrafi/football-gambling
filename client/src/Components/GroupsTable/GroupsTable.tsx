import React from "react";
import { GroupsBody } from "../GroupsBody/GroupsBody";
import Table from "@material-ui/core/Table";
import { GenericTableHead } from "../GenericTableHead/GenericTableHead";

import { TableWrapper } from "../../elements/TableWrapper";
import { Group } from "../../interfaces";
interface Props {
  columns: string[];
  auth: any;
  groups: Group[];
}
export const GroupsTable = (props: Props) => {
  const { columns, auth, groups } = props;
  return (
    <TableWrapper>
      <Table stickyHeader aria-label="sticky table" className="group--table">
        <GenericTableHead columns={columns} />
        <GroupsBody auth={auth} groups={groups} />
      </Table>
    </TableWrapper>
  );
};

import React from "react";
import { GroupsBody } from "../GroupsBody/GroupsBody";
import Table from "@material-ui/core/Table";
import { GenericTableHead } from "../GenericTableHead/GenericTableHead";

import { TableWrapper } from "../../elements/TableWrapper";
interface Props {
  columns: any;
  auth: any;
  groups: any;
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

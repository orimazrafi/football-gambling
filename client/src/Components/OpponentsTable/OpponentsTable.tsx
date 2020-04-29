import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { GenericTableHead } from "../GenericTableHead/GenericTableHead";
import { OpponentsBody } from "../opponentsBody/OpponentsBody";
const columns = [
  "status",
  "home team",
  "away team",
  "final score",
  "you'r gamble",
  "points",
];

interface Props {
  gambler: any;
  group: any;
}

export const OpponentsTable = (props: Props) => {
  const { gambler, group } = props;

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <GenericTableHead columns={columns} />
          <OpponentsBody gambler={gambler} group={group} />
        </Table>
      </TableContainer>
    </Paper>
  );
};

import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { GenericTableHead } from "../GenericTableHead/GenericTableHead";
import { OpponentsBody } from "../opponentsBody/OpponentsBody";
import { UserResults, LeagueOfGroup } from "../../interfaces";
import { opponentsColumns } from "../../helpers";

interface Props {
  gambler: UserResults;
  group: LeagueOfGroup;
}

export const OpponentsTable = (props: Props) => {
  const { gambler, group } = props;
  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <GenericTableHead columns={opponentsColumns} />
          <OpponentsBody gambler={gambler} group={group} />
        </Table>
      </TableContainer>
    </Paper>
  );
};

import React, { useState, useEffect } from "react";

import { CreateGroup } from "../CreateGroup/CreateGroup";
import { GroupList } from "../GroupList/GroupList";
import { Group } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { request } from "graphql-request";
import { reduxGetGroups } from "../../Features/Group/GroupSlice";
import { toast } from "react-toastify";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { GroupCell } from "../../elements/GroupCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import "./Groups.css";
interface Data {
  groups: Group[];
}
// eslint-disable-next-line
const log = console.log;
export const Groups: React.FC<any> = ({ auth }) => {
  let { groups } = useSelector(
    (state: { group: { groups: any } }) => state.group
  );
  log(groups);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    request("http://localhost:8080", FETCH_GROUPS).then(async (data) => {
      console.log(data);
      try {
        await dispatch(reduxGetGroups(data.groups));
        setLoading(false);
        toast.success("Groups was fetched");
      } catch (ex) {
        setLoading(false);
        toast.error(ex.message);
      }
    });
  }, [dispatch]);

  log(groups);
  const [name, setName] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const filteredArray = (groups: any) => {
    return groups.filter((group: any) =>
      group.name.toLowerCase().trim().includes(name.toLocaleLowerCase().trim())
    );
  };
  groups = filteredArray(groups);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "1.5em 0",
        }}
      >
        <div className="pure-control-group">
          <input
            name="name"
            type="text"
            placeholder="Search Group..."
            value={name}
            onChange={handleChange}
          />
        </div>

        <CreateGroup />
      </div>
      {loading ? (
        <div style={{ height: "50vh", display: "flex" }}>
          <div style={{ margin: "auto" }}>
            <h1>Loading Groups...</h1>
            <LoadingGif loading={true} size={100} />
          </div>
        </div>
      ) : (
        <>
          <Table
            stickyHeader
            aria-label="sticky table"
            className="group--table"
          >
            <TableHead>
              <TableRow>
                <GroupCell fontSize="1em" fontWeight="bold"></GroupCell>
                <GroupCell fontSize="1em" fontWeight="bold">
                  Name
                </GroupCell>
                <GroupCell fontSize="1em" fontWeight="bold">
                  Admin
                </GroupCell>
                <GroupCell fontSize="1em" fontWeight="bold">
                  Password
                </GroupCell>
                <GroupCell fontSize="1em" fontWeight="bold">
                  Participante
                </GroupCell>
                <GroupCell fontSize="1em" fontWeight="bold"></GroupCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <GroupList auth={auth} groups={groups} />
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

const FETCH_GROUPS = `
  {
    groups {
      _id
      image
      name
      password
      admin
      maxParticipate
      users {
        _id
        name
      }
      league{
        _id
      }
    }
  }
`;

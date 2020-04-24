import React, { useState, useEffect } from "react";

import { CreateGroup } from "../CreateGroup/CreateGroup";
import { GroupList } from "../GroupList/GroupList";
import { useSelector, useDispatch } from "react-redux";
import { request } from "graphql-request";
import { reduxGetGroups } from "../../Features/Group/GroupSlice";
import { toast } from "react-toastify";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import Table from "@material-ui/core/Table";
import { GroupCell } from "../../elements/GroupCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { TableWrapper } from "../../elements/TableWrapper";
import { LoadingText } from "../../elements/LoadingText";
import { InputAndButtonWrapper } from "../../elements/InputAndButtonWrapper";
import "./Groups.css";
import { tableHeader, BACKEND_URL } from "../../helpers";

// eslint-disable-next-line

const log = console.log;
export const Groups: React.FC<any> = ({ auth }) => {
  let { groups } = useSelector(
    (state: { group: { groups: any } }) => state.group
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    request(BACKEND_URL, FETCH_GROUPS).then(async (data) => {
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
    <>
      <InputAndButtonWrapper>
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
      </InputAndButtonWrapper>

      {loading ? (
        <>
          <LoadingText>Loading Groups...</LoadingText>
          <LoadingGif loading={true} size={100} />
        </>
      ) : (
        <TableWrapper>
          <Table
            stickyHeader
            aria-label="sticky table"
            className="group--table"
          >
            <TableHead>
              <TableRow>
                {tableHeader.map((head: string) => (
                  <GroupCell
                    key={Math.random()}
                    fontSize="1em"
                    fontWeight="bold"
                  >
                    {head}
                  </GroupCell>
                ))}
              </TableRow>
            </TableHead>
            <GroupList auth={auth} groups={groups} />
          </Table>
        </TableWrapper>
      )}
    </>
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

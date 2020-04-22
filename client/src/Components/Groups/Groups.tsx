import React, { useState, useEffect } from "react";

import { CreateGroup } from "../CreateGroup/CreateGroup";
import { GroupList } from "../GroupList/GroupList";
import { Group } from "../../interfaces";
import { useSelector, useDispatch } from "react-redux";
import { request } from "graphql-request";
import { reduxGetGroups } from "../../Features/Group/GroupSlice";
import { toast } from "react-toastify";
import "./Groups.css";
import { LoadingGif } from "../LoadingGif/LoadingGif";

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
        groups && (
          <>
            <div className="table__wrapper">
              <table className="pure-table pure-table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Admin</th>
                    <th>Password</th>
                    <th>Participante</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <GroupList auth={auth} groups={groups} />
                </tbody>
              </table>
            </div>
          </>
        )
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

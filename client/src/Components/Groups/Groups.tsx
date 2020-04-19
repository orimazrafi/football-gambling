import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./Groups.css";
import { CreateGroup } from "../CreateGroup/CreateGroup";
import { GroupList } from "../GroupList/GroupList";
import { Group } from "../../interfaces";
interface Data {
  groups: Group[];
}
// eslint-disable-next-line
const log = console.log;
export const Groups: React.FC<any> = ({ auth }) => {
  const { data, loading } = useQuery<Data, Record<string, any>>(FETCH_GROUPS);

  const [name, setName] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

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
      {loading && " Loading..."}
      {data && (
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
                <GroupList auth={auth} name={name} />
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const FETCH_GROUPS = gql`
  query {
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
    }
  }
`;

import React, { useState, useEffect } from "react";

import { CreateGroup } from "../CreateGroup/CreateGroup";
import { useSelector, useDispatch } from "react-redux";
import { request } from "graphql-request";
import { reduxGetGroups } from "../../Features/Group/GroupSlice";
import { toast } from "react-toastify";
import { LoadingGif } from "../LoadingGif/LoadingGif";

import { LoadingText } from "../../elements/LoadingText";
import { InputAndButtonWrapper } from "../../elements/InputAndButtonWrapper";
import { columns, BACKEND_URL } from "../../helpers";
import "./Groups.css";
import { GroupsTable } from "../GroupsTable/GroupsTable";

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
        <GroupsTable columns={columns} auth={auth} groups={groups} />
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

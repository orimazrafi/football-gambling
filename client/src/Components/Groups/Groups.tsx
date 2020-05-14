import React from "react";
import { CreateGroup } from "../CreateGroup/CreateGroup";
import { useSelector } from "react-redux";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import { LoadingText } from "../../elements/LoadingText";
import { InputAndButtonWrapper } from "../../elements/InputAndButtonWrapper";
import { columns } from "../../helpers";
import { GroupsTable } from "../GroupsTable/GroupsTable";
import { UseFilter } from "../../Hooks/UseFilter";
import { useInitailgroupsFetch } from "../../Hooks/useInitailgroupsFetch";
import { useHandleChange } from "../../Hooks/useHandleChange";
import { AuthType, Group } from "../../interfaces";
import "./Groups.css";

// eslint-disable-next-line
const log = console.log;
export interface Groups {
  group: {
    groups: Group[];
  };
}
export const Groups: React.FC<AuthType> = ({ auth }) => {
  let { groups } = useSelector((state: Groups) => state.group);
  const { loading } = useInitailgroupsFetch();
  const { handleChange, name } = useHandleChange();
  groups = UseFilter(groups, name);

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

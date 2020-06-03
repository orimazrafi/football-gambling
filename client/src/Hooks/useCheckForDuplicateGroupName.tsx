import { useState, useEffect } from "react";
import { CHECK_GROUP_NAME_EXIST } from "../queries";
import { BACKEND_URL } from "../helpers";
import request from "graphql-request";
const MINIMUM_LENGTH_OF_GROUP_NAME = 3;
export const useCheckForDuplicateGroupName = (open: boolean) => {
  const [name, setName] = useState("");
  const handleGroupName = (name: string) => {
    setName(name);
  };
  const [groupName, setGroupName] = useState({
    duplicate: false,
    message: "",
  });
  useEffect(() => {
    setGroupName({ duplicate: false, message: "" });
  }, [open, name]);
  useEffect(() => {
    const variables = { name };
    if (name.length < MINIMUM_LENGTH_OF_GROUP_NAME) return;
    request(BACKEND_URL, CHECK_GROUP_NAME_EXIST, variables).then(
      async (groupResponse) => {
        if (!groupResponse.checkGroupNameExist.success) {
          setGroupName({
            duplicate: true,
            message: groupResponse.checkGroupNameExist.messsage,
          });
        } else {
          setGroupName({ duplicate: false, message: "" });
        }
      }
    );
  }, [name, setName]);

  return { groupName, handleGroupName };
};

import { useState, useEffect } from "react";
import { CHECK_GROUP_NAME_EXIST } from "../queries";
import { BACKEND_URL } from "../helpers";
import request from "graphql-request";

export const useCheckForDuplicateGroupName = (name: string, open: boolean) => {
  const [groupName, setGroupName] = useState({
    duplicate: false,
    message: "",
  });
  useEffect(() => {
    setGroupName({ duplicate: false, message: "" });
  }, [open, name]);
  useEffect(() => {
    const variables = { name };
    request(BACKEND_URL, CHECK_GROUP_NAME_EXIST, variables).then(
      async (groupResponse) => {
        if (!groupResponse.checkGroupNameExist.success) {
          setGroupName({
            duplicate: true,
            message: groupResponse.checkGroupNameExist.messsage,
          });
        }
      }
    );
  }, [name]);

  return { groupName };
};

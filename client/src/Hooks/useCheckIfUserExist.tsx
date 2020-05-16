import { request } from "graphql-request";
import { SEARCH_USER } from "../queries";
import { BACKEND_URL } from "../helpers";
import { useState } from "react";
export const useCheckIfUserExist = (email: string) => {
  const [data, setData] = useState({ success: false });
  request(BACKEND_URL, SEARCH_USER, { email: email }).then(async (data) => {
    setData(data);
  });
  return data.success;
};

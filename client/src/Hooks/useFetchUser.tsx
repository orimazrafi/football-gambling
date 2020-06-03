import { useDispatch } from "react-redux";

import { request } from "graphql-request";
import { reduxSetUser } from "../Features/User/UserSlice";
import { useHistory } from "react-router-dom";
import { FETCH_USER } from "../queries";
import { BACKEND_URL } from "../helpers";
export const useFetchUser = (variables: {
  email: string;
  name: string;
  image: string;
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchUser = () => {
    request(BACKEND_URL, FETCH_USER, variables).then(async (data) => {
      if (data.getUserId.success) {
        await dispatch(reduxSetUser(data.getUserId.user));
        return history.push("/");
      }
    });
  };
  return fetchUser;
};

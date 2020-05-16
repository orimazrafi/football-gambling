import { useDispatch } from "react-redux";

import { request } from "graphql-request";
import { reduxSetUser } from "../Features/User/UserSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../helpers";
import { CREATE_USER } from "../mutations";
export const useCreateUser = (variables: {
  email: string;
  name: string;
  image: string;
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const createUser = () => {
    request(BACKEND_URL, CREATE_USER, variables).then(async (data) => {
      if (data.createUser.success) {
        toast.success(data.createUser.message);
        await dispatch(reduxSetUser(data.createUser.user));
        return history.push("/");
      } else toast.error(data.createUser.message);
    });
  };
  return createUser;
};

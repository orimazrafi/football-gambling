import React from "react";
import { useDispatch } from "react-redux";

import { request } from "graphql-request";
import { reduxSetUser } from "../../Features/User/UserSlice";
import { useHistory } from "react-router-dom";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { FETCH_USER, SEARCH_USER } from "../../queries";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../helpers";
import { CREATE_USER } from "../../mutations";

export const Secret = ({ email, name, image }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const variables = {
    name,
    email,
    image,
  };

  request(BACKEND_URL, SEARCH_USER, { email: email }).then(async (data) => {
    if (data.search.success) fetchUser();
    createUser();
  });

  const fetchUser = () => {
    request(BACKEND_URL, FETCH_USER, variables).then(async (data) => {
      if (data.getUserId.success) {
        toast.success(data.getUserId.message);
        await dispatch(reduxSetUser(data.getUserId.user));
        return history.push("/");
      }
    });
  };
  const createUser = () => {
    request(BACKEND_URL, CREATE_USER, variables).then(async (data) => {
      if (data.createUser.success) {
        toast.success(data.createUser.message);
        await dispatch(reduxSetUser(data.createUser.user));
        return history.push("/");
      } else toast.error(data.createUser.message);
    });
  };

  return (
    <div className="secret--page">
      <div className="secret--page__inner__wrapper">
        <h1>Fetching user...</h1>
        <LoadingGif loading={true} size={150} />
      </div>
    </div>
  );
};

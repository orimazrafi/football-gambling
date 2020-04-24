import React from "react";
// import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";

import { request } from "graphql-request";
import { reduxSetUser } from "../../Features/User/UserSlice";
import { useHistory } from "react-router-dom";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
import { FETCH_USER } from "../../mutations";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../helpers";

// const theme = {
//   primary: "red",
//   secondary: "green",
//   font: "sans-serif",
//   hoverBackground: "#FFA500",
// };
export const Secret = ({ email, name, image }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const variables = {
    name,
    email,
    image,
  };

  request(BACKEND_URL, FETCH_USER, variables).then(async (data) => {
    if (data.getUserId.success) {
      toast.success(data.getUserId.message);
      await dispatch(reduxSetUser(data.getUserId.user));
      history.push("/");
    } else toast.error(data.getUserId.message);
  });

  return (
    <div style={{ height: "80vh", display: "flex" }}>
      <div style={{ margin: "auto" }}>
        <h1>Fetching user...</h1>
        <LoadingGif loading={true} size={150} />
      </div>
    </div>
  );
};

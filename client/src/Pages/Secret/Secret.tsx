import React from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";

import { request } from "graphql-request";
import { reduxSetUser } from "../../Features/User/UserSlice";
import { useHistory } from "react-router-dom";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";

const theme = {
  primary: "red",
  secondary: "green",
  font: "sans-serif",
  hoverBackground: "#FFA500",
};
export const Secret = ({ email, name, image }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const variables = {
    name,
    email,
    image,
  };

  request("http://localhost:8080", FETCH_USER, variables).then(async (data) => {
    await dispatch(reduxSetUser(data.getUserId));
    history.push("/");
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
const FETCH_USER = `mutation getUserId($name: String!, $email: String!, $image: String!) {
  getUserId(user: { name: $name, email: $email, image: $image }) {
    _id
    name
    image
    email
    groups{
      _id
    }
    results{
      _id
    }
  }
}`;

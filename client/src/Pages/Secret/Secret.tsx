import React from "react";
import { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";

import { request } from "graphql-request";
import { reduxSetUser } from "../../Features/User/UserSlice";
import { useHistory } from "react-router-dom";

const theme = {
  primary: "red",
  secondary: "green",
  font: "sans-serif",
  hoverBackground: "#FFA500",
};
export const Secret = ({ email, name, image, auth }: any) => {
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
    <ThemeProvider theme={theme}>
      <div style={{ height: "400px", display: "flex" }}></div>
    </ThemeProvider>
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

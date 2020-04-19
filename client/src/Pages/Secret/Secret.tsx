import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { H4 } from "../../elements/H4";
import { LoadingGif } from "../../Components/LoadingGif/LoadingGif";
const theme = {
  primary: "red",
  secondary: "green",
  font: "sans-serif",
  hoverBackground: "#FFA500",
};
export const Secret = ({ email, name, picture }: any) => {
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const [errors, setErrors] = useState("");
  const [getUser, { loading }] = useMutation(FETCH_USER, {
    update(proxy, result) {
      if (!loading) localStorage.setItem("user_id", result.data.getUserId._id);
    },
    onError(err) {
      setErrors(err.message);
    },
    variables: { name, email, image: picture },
  });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "400px", display: "flex" }}>
        {errors && JSON.stringify(errors)}
        {loading ? (
          <LoadingGif loading={loading} />
        ) : (
          <H4>
            <div>Hello {name},</div>
            And Welcome To Football Gambling
          </H4>
        )}
      </div>
    </ThemeProvider>
  );
};
const FETCH_USER = gql`
  mutation getUserId($name: String!, $email: String!, $image: String!) {
    getUserId(user: { name: $name, email: $email, image: $image }) {
      name
      _id
      image
      email
    }
  }
`;

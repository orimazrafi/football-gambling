import React from "react";
import { ThemeProvider } from "styled-components";
import { Groups } from "../../Components/Groups/Groups";
import { defualtImage, cloudinaryFetchUrl } from "../../helpers";
import "purecss/build/pure.css";

import "./HomePage.css";
import { SuccessButton } from "../../elements/SuccessButton";

// eslint-disable-next-line
const log = console.log;
const theme = {
  primary: "teal",
  secondary: "green",
  font: "sans-serif",
  fontSize: "2rem",
  hoverBackground: "blue",
};

export const HomePage = ({ auth }: { auth: any }) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {!auth.isAuthenticated() ? (
          <div>
            <hr />
            <div className="header">
              <h1>welcome to football gambling!</h1>
              <pre className="header__watch__home__page">
                Please login first
              </pre>
            </div>

            <hr className="home--page" />

            <SuccessButton
              margin="auto"
              variant="contained"
              color="primary"
              padding="0.75em 1.7em"
              onClick={auth.login}
            >
              login
            </SuccessButton>
            <img
              className="home__page__img"
              src={`${cloudinaryFetchUrl}/${defualtImage}`}
              alt={"home_page"}
            />
          </div>
        ) : (
          <Groups auth={auth} />
        )}
      </div>
    </ThemeProvider>
  );
};

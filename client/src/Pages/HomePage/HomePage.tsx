import React from "react";
import { ThemeProvider } from "styled-components";
import { MainDiv } from "../../elements/Main";
import { Groups } from "../../Components/Groups/Groups";
import { defualtGroupImage, cloudinaryFetchUrl } from "../../helpers";
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
              name="true"
              variant="contained"
              color="primary"
              onClick={auth.login}
            >
              login
            </SuccessButton>
            <img
              className="home__page__img"
              src={`${cloudinaryFetchUrl}/${defualtGroupImage}`}
              alt={"logo"}
            />
          </div>
        ) : (
          <MainDiv>
            <Groups auth={auth} />
          </MainDiv>
        )}
      </div>
    </ThemeProvider>
  );
};

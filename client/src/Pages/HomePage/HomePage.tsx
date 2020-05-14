import React from "react";
import { ThemeProvider } from "styled-components";
import { Groups } from "../../Components/Groups/Groups";
import { defualtImage, cloudinaryFetchUrl } from "../../helpers";
import "purecss/build/pure.css";

import "./HomePage.css";
import { SuccessButton } from "../../elements/SuccessButton";
import { WelcomeLoginTextwrapper } from "../../Components/WelcomeLoginTextwrapper/WelcomeLoginTextwrapper";

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
            <WelcomeLoginTextwrapper />
            <SuccessButton
              margin="auto"
              variant="contained"
              color="primary"
              padding="0.75em 1.7em"
              background="rgb(28, 184, 65)"
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

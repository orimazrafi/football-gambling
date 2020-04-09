import React from "react";
import { ThemeProvider } from "styled-components";
import { MainDiv } from "../../elements/Main";
import { Groups } from "../../Components/Groups/Groups";
import { CreateGroup } from "../../Components/CreateGroup/CreateGroup";
import { Button } from "../../elements/Button";

const theme = {
  primary: "teal",
  secondary: "green",
  font: "sans-serif",
  fontSize: "2rem",
  hoverBackground: "blue",
};

export const HomePage = ({
  name,
  auth,
}:
  | {
      name: string;
      location: string;
      auth: any;
    }
  | any) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        {!auth.isAuthenticated() ? (
          <div>
            <hr />
            Please login first
            <hr />
            <Button onClick={auth.login}>login</Button>
          </div>
        ) : (
          <MainDiv>
            <p className="App-intro">
              Hello, {name}
              <br />
            </p>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Groups />

              <CreateGroup />
            </div>
          </MainDiv>
        )}
      </div>
    </ThemeProvider>
  );
};

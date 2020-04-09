import React from "react";
import { ThemeProvider } from "styled-components";

import { H4 } from "../../elements/H4";
const theme = {
  primary: "red",
  secondary: "green",
  font: "sans-serif",
  hoverBackground: "#FFA500"
};
export const Secret = ({ name }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "400px", display: "flex" }}>
        <H4>
          <div>Hello {name},</div>
          And Welcome To Football Gambling
        </H4>
      </div>
    </ThemeProvider>
  );
};

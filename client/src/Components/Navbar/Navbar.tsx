import React from "react";
import { Nav } from "../../elements/Nav";
import { NavItem } from "../../elements/NavItem";
import { Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Image } from "../../elements/Image";
import "./Navbar.css";
const theme = {
  marginRight: "auto",
};
export const Navbar = ({
  name,
  auth,
  picture,
}:
  | {
      name: string;
      location: string;
      auth: any;
      picture: string;
    }
  | any) => {
  console.log(name);
  const handleLogout = () => {
    auth.logout();
  };
  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <NavItem>
          <Link to="/">Home</Link>{" "}
        </NavItem>
        <NavItem>
          <Link to="/score">Score</Link>{" "}
        </NavItem>
        <NavItem>
          <Link to="/gamble">Gamble</Link>{" "}
        </NavItem>
        <NavItem>
          <Link to="/rules" className="rules__item">
            Rules
          </Link>{" "}
        </NavItem>
        <NavItem marginLeft>
          {picture ? <Image src={picture} /> : <Link to="/">{name}</Link>}
        </NavItem>
        <NavItem onClick={handleLogout} warning>
          Logout
        </NavItem>
      </Nav>
    </ThemeProvider>
  );
};

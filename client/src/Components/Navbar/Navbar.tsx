import React from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useNavbarGambleDropDown } from "../../Hooks/useNavbarGambleDropDown";
import { AuthLogout } from "../../interfaces";
import { GambleNavbarDropDown } from "../GambleNavbarDropDown/GambleNavbarDropDown";
import { OpponentsAndGamblesHeader } from "../OpponentsAndGamblesHeader/OpponentsAndGamblesHeader";
import { NavbarLink } from "../NavbarLink/NavbarLink";
import { NavbarLinkImage } from "../NavbarLinkImage/NavbarLinkImage";
import { NavbarLinkLogout } from "../NavbarLinkLogout/NavbarLinkLogout";
import "./Navbar.css";
const theme = {
  marginRight: "auto",
};

interface Props {
  name: string;
  auth: AuthLogout;
  image: string;
}
export const Navbar = (props: Props) => {
  const { name, auth, image } = props;
  // eslint-disable-next-line
  const log = console.log;

  const handleLogout = () => {
    auth.logout();
  };

  const {
    open,
    anchorRef,
    handleToggle,
    handleCloseDropDown,
    handleListKeyDown,
  } = useNavbarGambleDropDown();

  return (
    <ThemeProvider theme={theme}>
      <div className="pure-menu pure-menu-horizontal">
        <Link to="/" className="pure-menu-link pure-menu-heading">
          Home
        </Link>
        <ul className="pure-menu-list">
          <NavbarLink to="/score" name="Score" cssClassName="pure-menu-link" />
          <li className="pure-menu-item">
            <span
              className="pure-menu-link "
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              Gamble
            </span>
          </li>

          <GambleNavbarDropDown
            open={open}
            anchorRef={anchorRef}
            handleCloseDropDown={handleCloseDropDown}
            handleListKeyDown={handleListKeyDown}
          />
          <NavbarLink
            to="/rules"
            name="Rules"
            cssClassName="pure-menu-link rules__item"
          />
          <NavbarLinkImage image={image} name={name} />
          <NavbarLinkLogout handleLogout={handleLogout} />
        </ul>
      </div>
      <OpponentsAndGamblesHeader />
    </ThemeProvider>
  );
};

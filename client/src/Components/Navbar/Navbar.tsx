import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Image } from "../../elements/Image";
import moment from "moment";
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
  // eslint-disable-next-line
  const log = console.log;
  const { pathname } = useLocation();
  let pageLoaction = pathname.slice(1) ? pathname.slice(1) : "Home";
  let m: any = moment();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="pure-menu pure-menu-horizontal">
        <Link to="/" className="pure-menu-link pure-menu-heading">
          Home
        </Link>
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            <Link to="/score" className="pure-menu-link">
              Score
            </Link>
          </li>
          <li className="pure-menu-item">
            <Link to="/gamble" className="pure-menu-link">
              Gamble
            </Link>
          </li>
          <li className="pure-menu-item">
            <Link to="/rules" className="pure-menu-link rules__item">
              Rules
            </Link>
          </li>

          <li className="pure-menu-item navbar__image__Link">
            {picture ? (
              <Link to="/gamble">
                <Image src={picture} />
              </Link>
            ) : (
              <Link to="/gamble">{name}</Link>
            )}
          </li>

          <li className="pure-menu-item" onClick={handleLogout}>
            <div className="pure-menu-link logout__link__item">Logout</div>
          </li>
        </ul>
      </div>

      <div className="header">
        <h1>{pageLoaction}</h1>
        <pre className="header__watch">{m.format("ddd, hA")}</pre>
      </div>
      <hr />
    </ThemeProvider>
  );
};

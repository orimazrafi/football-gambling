import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Image } from "../../elements/Image";
import moment from "moment";
import "./Navbar.css";
import { useSelector } from "react-redux";

const theme = {
  marginRight: "auto",
};

export const Navbar = ({
  name,
  auth,
  image,
}:
  | {
      name: string;
      location: string;
      auth: any;
      image: string;
    }
  | any) => {
  const { user } = useSelector(
    (state: {
      user: {
        user: { _id: string; results: { name: ""; image: "" } };
      };
    }) => state.user
  );
  // eslint-disable-next-line
  const log = console.log;
  const { pathname } = useLocation();
  let pageLoaction = pathname.slice(1) ? pathname.slice(1) : "Home";
  let m: moment.Moment = moment();

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
            {image ? (
              <Link to="/gamble">
                <Image
                  src={image}
                  noboard="1px solid black"
                  margin="auto"
                  verticalalign="middle"
                  height="30px"
                  width="30px"
                />
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
      {pageLoaction !== "secret" && (
        <>
          <div className="header">
            {pageLoaction === "gamble" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2em auto",
                }}
              >
                <div>
                  <img
                    src={user.results.image}
                    alt={user.results.name}
                    height="100"
                    width="100"
                  />
                </div>
                <div>
                  <h1 style={{ fontSize: "2.5em" }}>{pageLoaction}</h1>
                </div>
                <div>
                  <img
                    src={user.results.image}
                    alt={user.results.name}
                    height="100"
                    width="100"
                  />
                </div>
              </div>
            ) : (
              <h1>{pageLoaction}</h1>
            )}{" "}
            {/* {pageLoaction === "gamble" && (
              <>
                <span>{user.results.name} League</span>
                {
                  <Image
                    src={user.results.image}
                    alt={user.results.name}
                    noboard="unset"
                    margin="1em auto 2em auto"
                    verticalalign="middle"
                    height="60px"
                    width="60px"
                  />
                }
              </>
            )} */}
            <pre className="header__watch">{m.format("ddd, hA")}</pre>
          </div>
          <hr />
        </>
      )}
    </ThemeProvider>
  );
};

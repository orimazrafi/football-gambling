import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Image } from "../../elements/Image";
import moment from "moment";
import { useSelector } from "react-redux";
import { LoadingGif } from "../LoadingGif/LoadingGif";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import "./Navbar.css";
import { useNavbarGambleDropDown } from "../../Hooks/useNavbarGambleDropDown";
import { usePageLocation } from "../../Hooks/usePageLocation";
import { AuthType } from "../../interfaces";
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
      auth: AuthType;
      image: string;
    }
  | any) => {
  const { user } = useSelector(
    (state: {
      user: {
        user: {
          _id: string;
          results: { name: string; image: string };
          opponent: {
            name: string;
            image: string;
          };
        };
      };
    }) => state.user
  );
  // eslint-disable-next-line
  const log = console.log;
  const { pathname } = useLocation();
  const { pageLoaction } = usePageLocation(pathname);
  let momentFormat: moment.Moment = moment();

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
          <li className="pure-menu-item">
            <Link to="/score" className="pure-menu-link">
              Score
            </Link>
          </li>
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

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            className="navbar--popper"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseDropDown}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <ul className="pure-menu-list dropdown--wrapper ">
                        <li className="pure-menu-item">
                          <Link
                            to="/gamble"
                            className="pure-menu-link"
                            onClick={handleCloseDropDown}
                          >
                            Matches
                          </Link>
                        </li>
                        <li className="pure-menu-item">
                          <Link
                            to="/best-scorer"
                            className="pure-menu-link"
                            onClick={handleCloseDropDown}
                          >
                            Best Scorer
                          </Link>
                        </li>
                        <li className="pure-menu-item">
                          <Link
                            to="/winning-team"
                            className="pure-menu-link"
                            onClick={handleCloseDropDown}
                          >
                            Winning Team
                          </Link>
                        </li>
                      </ul>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
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
            {(pageLoaction === "gamble" ||
              pageLoaction === "best-scorer" ||
              pageLoaction === "winning-team") &&
              (!user?.results?.image && !user?.results?.image ? (
                <LoadingGif loading={true} size={100} />
              ) : (
                <div className="header__gamble__wrapper">
                  <div>
                    <img
                      src={user?.results?.image}
                      alt={user?.results?.name}
                      className="header__gamble__wrapper__left__image"
                    />
                  </div>
                  <div>
                    <h1>{pageLoaction}</h1>
                  </div>
                  <div>
                    <img
                      src={user?.results?.image}
                      alt={user?.results?.name}
                      className="header__gamble__wrapper__right__image"
                    />
                  </div>
                </div>
              ))}
            {pageLoaction === "opponents" &&
              (!user?.opponent?.image ? (
                <LoadingGif loading={true} size={100} />
              ) : (
                <div className="opponents--header--wrapper">
                  <div>
                    <img
                      src={user?.opponent?.image}
                      alt={user?.opponent?.name}
                      className="opponents--header--wrapper__left__image"
                    />
                  </div>
                  <div>
                    <h1>{pageLoaction}</h1>
                  </div>
                  <div>
                    <img
                      src={user?.opponent?.image}
                      alt={user?.opponent?.name}
                      className="opponents--header--wrapper__right__image"
                    />
                  </div>
                </div>
              ))}
            {pageLoaction !== "opponents" &&
              pageLoaction !== "gamble" &&
              pageLoaction !== "best-scorer" &&
              pageLoaction !== "winning-team" && <h1>{pageLoaction}</h1>}
            <pre className="header__watch">
              {momentFormat.format("ddd, hA")}
            </pre>
          </div>
          <hr />
        </>
      )}
    </ThemeProvider>
  );
};

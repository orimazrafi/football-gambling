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
        user: {
          _id: string;
          results: { name: ""; image: "" };
          opponent: {
            name: "";
            image: "";
          };
        };
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
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
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
            style={{ zIndex: 1 }}
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
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <ul
                        className="pure-menu-list"
                        style={{ flexDirection: "column" }}
                      >
                        <li className="pure-menu-item">
                          <Link
                            to="/gamble"
                            className="pure-menu-link"
                            onClick={handleClose}
                          >
                            Matches
                          </Link>
                        </li>
                        <li className="pure-menu-item">
                          <Link
                            to="/best-scorer"
                            className="pure-menu-link"
                            onClick={handleClose}
                          >
                            Best Scorer
                          </Link>
                        </li>
                        <li className="pure-menu-item">
                          <Link
                            to="/winning-team"
                            className="pure-menu-link"
                            onClick={handleClose}
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2em auto",
                  }}
                >
                  <div>
                    <img
                      src={user?.results?.image}
                      alt={user?.results?.name}
                      height="100"
                      width="100"
                      style={{ borderRadius: "50%", margin: "0 15px 0 0" }}
                    />
                  </div>
                  <div>
                    <h1 style={{ fontSize: "2.5em" }}>{pageLoaction}</h1>
                  </div>
                  <div>
                    <img
                      src={user?.results?.image}
                      alt={user?.results?.name}
                      height="100"
                      width="100"
                      style={{ borderRadius: "50%", margin: "0 0 0 15px" }}
                    />
                  </div>
                </div>
              ))}
            {pageLoaction === "opponents" &&
              (!user?.opponent?.image ? (
                <LoadingGif loading={true} size={100} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "2em auto",
                  }}
                >
                  <div>
                    <img
                      src={user?.opponent?.image}
                      alt={user?.opponent?.name}
                      height="100"
                      width="100"
                      style={{ borderRadius: "50%", margin: "0 15px 0 0" }}
                    />
                  </div>
                  <div>
                    <h1 style={{ fontSize: "2.5em" }}>{pageLoaction}</h1>
                  </div>
                  <div>
                    <img
                      src={user?.opponent?.image}
                      alt={user?.opponent?.name}
                      height="100"
                      width="100"
                      style={{ borderRadius: "50%", margin: "0 0 0 15px" }}
                    />
                  </div>
                </div>
              ))}
            {pageLoaction !== "opponents" &&
              pageLoaction !== "gamble" &&
              pageLoaction !== "best-scorer" &&
              pageLoaction !== "winning-team" && <h1>{pageLoaction}</h1>}
            <pre className="header__watch">{m.format("ddd, hA")}</pre>
          </div>
          <hr />
        </>
      )}
    </ThemeProvider>
  );
};

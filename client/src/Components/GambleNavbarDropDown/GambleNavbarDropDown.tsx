import React from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
interface Props {
  open: boolean;
  anchorRef: React.MutableRefObject<any>;
  handleCloseDropDown: (
    event: React.MouseEvent<EventTarget, MouseEvent>
  ) => void;
  handleListKeyDown: (event: React.KeyboardEvent<Element>) => void;
}

export const GambleNavbarDropDown = (props: Props) => {
  const { open, anchorRef, handleCloseDropDown, handleListKeyDown } = props;
  return (
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
  );
};

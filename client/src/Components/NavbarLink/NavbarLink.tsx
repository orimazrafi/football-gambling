import { Link } from "react-router-dom";
import React from "react";
interface Props {
  to: string;
  name: string;
  cssClassName: string;
}

export const NavbarLink = (props: Props) => {
  const { to, name, cssClassName } = props;
  return (
    <li className="pure-menu-item">
      <Link to={to} className={cssClassName}>
        {name}
      </Link>
    </li>
  );
};

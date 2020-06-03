import React from "react";
interface Props {
  handleLogout: () => void;
}
export const NavbarLinkLogout = (props: Props) => {
  const { handleLogout } = props;
  return (
    <li className="pure-menu-item" onClick={handleLogout}>
      <div className="pure-menu-link logout__link__item">Logout</div>
    </li>
  );
};

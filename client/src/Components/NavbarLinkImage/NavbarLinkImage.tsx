import React from "react";
import { Link } from "react-router-dom";
import { Image } from "../../elements/Image";
interface Props {
  image: string;
  name: string;
}
export const NavbarLinkImage = (props: Props) => {
  const { image, name } = props;
  return (
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
  );
};

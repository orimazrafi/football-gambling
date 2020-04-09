import styled, { StyledFunction } from "styled-components";

const navItem: StyledFunction<any> = styled.div;
export const NavItem = navItem`
  padding: 5px;
  margin-left: ${props => (props.marginLeft ? "auto" : "unset")};
  a {
    text-decoration: none;
    color: #000000;
  }
  &:hover {
    font-weight: ${props =>
      props.marginLeft || props.warning ? "normal" : "bold"};
    ;
    cursor: pointer;
  color:${props => (props.warning ? "red" : "black")};

  }
`;

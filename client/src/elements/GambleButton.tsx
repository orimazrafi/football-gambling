import styled from "styled-components";
import Button from "@material-ui/core/Button";

interface Props {
  background: string;
  backgroundhover: string;
}

export const GambleButton = styled(Button)<Props>`
  font-size: 10px;
  display: block;
  font-weight: 600;
  padding: 0.4em 0.2em;
  background: ${(props) => props.background};
  min-width: 40px;
  margin: 0 0 5px 0;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background: ${(props) => props.backgroundhover};
    opacity: 0.5;
  }
  @media screen and (min-width: 700px) {
    display: inline-block;
  }
`;

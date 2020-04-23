import styled from "styled-components";
import Button from "@material-ui/core/Button";

interface Props {
  background: string;
  backgroundhover: string;
}

export const TableButton = styled(Button)<Props>`
  font-size: 10px;
  display: inline-block;
  font-weight: 600;
  padding: 0.4em 0;
  background: ${(props) => props.background};
  min-width: 40px;
  margin: 5px;
  color: #fff;
  &:hover {
    background: ${(props) => props.backgroundhover};
    opacity: 0.5;
  }
`;

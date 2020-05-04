import styled from "styled-components";
import Button from "@material-ui/core/Button";

interface Props {
  margin: string;
  padding: string;
  background: string;
}
export const SuccessButton = styled(Button)<Props>`
  display: block;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.background};
  color: #fff;
  &:hover {
    background: ${(props) => props.background};
    opacity: 0.5;
  }
`;

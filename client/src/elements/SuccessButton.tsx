import styled from "styled-components";
import Button from "@material-ui/core/Button";

interface Props {
  margin: string;
  padding: string;
}
export const SuccessButton = styled(Button)<Props>`
  display: block;
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: rgb(28, 184, 65);
  color: #fff;
  &:hover {
    background: rgb(5, 236, 60);
    opacity: 0.5;
  }
`;

import styled from "styled-components";
import Button from "@material-ui/core/Button";

interface Props {
  name: string;
}
export const SuccessButton = styled(Button)<Props>`
  display: block;
  margin: auto;
  padding: 0.75em 1.7em;
  background: rgb(28, 184, 65);
  color: #fff;
  &:hover {
    background: rgb(5, 236, 60);
    opacity: 0.5;
  }
`;

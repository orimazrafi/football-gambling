import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";
interface Props {
  fontSize: string;
  fontWeight: string;
  textoverflow: string;
}
export const GroupCell = styled(TableCell)<Props>`
  padding: 0.2em;
  max-width: 50px;
  overflow: scroll;
  white-space: nowrap;
  text-overflow: ${(props) => props.textoverflow};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  text-align: center;
  @media screen and (min-width: 700px) {
    padding: 1em;
    max-width: 250px;
  }
`;

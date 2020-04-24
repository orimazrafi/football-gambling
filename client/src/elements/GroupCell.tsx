import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";
interface Props {
  fontSize: string;
  fontWeight: string;
}
export const GroupCell = styled(TableCell)<Props>`
  padding: 0.2em;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  text-align: center;
  @media screen and (min-width: 470px) {
    padding: 0.5em;
    max-width: 100px;
  }
  @media screen and (min-width: 570px) {
    padding: 0.8em;
    max-width: 120px;
  }
  @media screen and (min-width: 700px) {
    padding: 1em;
    max-width: 250px;
  }
`;

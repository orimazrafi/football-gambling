import styled from "styled-components";
import TableCell from "@material-ui/core/TableCell";
// const input: StyledFunction<any> = styled.input;
interface Props {
  fontSize: string;
  fontWeight: string;
}
export const GroupCell = styled(TableCell)<Props>`
  text-align: center;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

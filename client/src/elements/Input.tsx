import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

// const input: StyledFunction<any> = styled.input;
interface Props {
  error: string;
}
export const Input: any = styled(TextField)`
  width: ${(props: Props) => (props.error ? "8px 0 0 0" : "8px 0")}%;
  padding: 12px 20px;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
`;

import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
// const input: StyledFunction<any> = styled.input;
interface Props {
  fontSize: string;
  fontWeight: string;
}
export const ModalDialog = styled(Dialog)`
  width: 800pxa;
`;

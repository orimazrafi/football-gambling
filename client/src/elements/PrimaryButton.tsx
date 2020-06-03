import styled from "styled-components";
import Button from "@material-ui/core/Button";
interface Props {
  margin: string;
}
export const PrimaryButton = styled(Button)`
  margin: ${(props: Props) => props.margin};
`;

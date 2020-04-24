import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";

interface Props {
  noboard: string;
  margin: string;
  verticalalign: string;
  height: string;
  width: string;
}
export const Image = styled(Avatar)<Props>`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  /* border-radius: 50%; */
  border: ${(props) => props.noboard};
  margin: ${(props) => props.margin};
  vertical-align: ${(props) => props.verticalalign};
`;

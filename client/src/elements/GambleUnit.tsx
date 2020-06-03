import styled from "styled-components";
interface Props {
  width: string;
  textOverflow: string;
  display: string;
}
const div = styled.div;
export const GambleUnit = div`
    width:${(props: Props) => props.width};
    overflow:${(props: Props) =>
      props.textOverflow === "unset" ? "unset" : "hidden"} ;
    text-overflow: ${(props: Props) =>
      props.textOverflow === "unset" ? "unset" : "ellipsis"};
    white-space: nowrap;
    align-self:center;
    @media screen and (max-width: 600px) {
      display: ${(props: Props) =>
        props.display === "noneOnSmallScreen" ? "none" : "block"};      }
`;

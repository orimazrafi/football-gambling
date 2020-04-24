import styled from "styled-components";
interface Props {
  width: string;
}
const div = styled.div;
export const GambleUnit = div`
width:${(props: Props) => props.width};
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
align-self: end;

    @media screen and (min-width: 720px) {

      }
      
    
`;

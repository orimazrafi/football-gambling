import styled from "styled-components";
interface Props {
  width: string;
  margin: string;
}
const div = styled.div;
export const Container = div`
    width:${(props: Props) => props.width};
    margin:${(props: Props) => props.margin};
    
`;

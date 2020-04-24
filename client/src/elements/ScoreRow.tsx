import styled from "styled-components";

interface Props {
  borderradius: string;
}
const div = styled.div;
export const ScoreRow = div`
    position: relative;
    display: flex;
    width: 95%;
    max-width: 850px;
    padding: 10px;
    background-color: rgb(255, 140, 0);
    margin: auto;
    transition: transform 500ms;
    justify-content: space-between;
    &:hover{
      cursor:pointer;
    }
    align-items: center;
    border-radius:${(props: Props) => props.borderradius};
    @media screen and (min-width: 650px) {
        width: 75%;
`;

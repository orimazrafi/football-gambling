import styled, { StyledFunction } from "styled-components";

const inputAndButtonWrapper: StyledFunction<any> = styled.div;
export const InputAndButtonWrapper = inputAndButtonWrapper`
display: flex;
justify-content: space-evenly;
margin: 1.5em 0;
`;

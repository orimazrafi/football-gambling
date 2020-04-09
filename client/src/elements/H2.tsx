import styled, { StyledFunction } from "styled-components";

const h2: StyledFunction<any> = styled.h2;
export const H2 = h2`
text-align:center;
animation-name: fadeInOpacity;
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 2s;
/* Quick on the way out */
transition: 0.2s;

`;

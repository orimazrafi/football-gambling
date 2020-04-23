import styled, { StyledFunction } from "styled-components";

const h4: StyledFunction<any> = styled.h4;
export const H4 = h4`
font-size: 1.5em;
margin:auto;
color:#000080;
opacity: 1;
animation-name: fadeInOpacity;
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 2s;
/* Quick on the way out */
transition: 0.2s;


@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@media screen and (min-width: 700px) {
  font-size: 2.5em;
  transition: 2s;
}
@media screen and (min-width: 1200px) {
  font-size: 3em;
  transition: 2s;
}
  }
`;

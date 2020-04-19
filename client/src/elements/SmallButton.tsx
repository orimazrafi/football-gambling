import styled, { StyledFunction } from "styled-components";

const button: StyledFunction<any> = styled.button;
export const SmallButton = button`
  font-family: "url(https://fonts.googleapis.com/css?family=Neucha|Patrick+Hand+SC)";
 

  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 2s;
  /* Quick on the way out */
  transition: 0.2s;
  border-radius: 5px;
  margin:1px;
  border: none;
  padding: 4px;
  background: ${(props) => (props.primary ? "#1E90FF" : "#228B22")};
  background:${(props) => props.disabled && "#A9A9A9"};
  color: #fff;

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  &:hover {
    background: ${(props) => (props.primary ? "#00BFFF" : "#32CD32	")};
    background:${(props) => props.disabled && "#A9A9A9"};
    cursor: pointer;
    cursor:${(props) => props.disabled && "not-allowed"};
  }
`;

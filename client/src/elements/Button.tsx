import styled, { StyledFunction } from "styled-components";

const button: StyledFunction<any> = styled.button;
export const Button = button`
  font-family: "url(https://fonts.googleapis.com/css?family=Neucha|Patrick+Hand+SC)";
  font-size: ${(props) => props.theme.fontSize};
  font-size: ${(props) => props.small && "20px"};
  float: ${(props) => props.small && "right"};

  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 2s;
  /* Quick on the way out */
  transition: 0.2s;
  border-radius: 5px;
  border: none;
  padding: 7px 10px;
  background: red;
  color: #fff;

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  background: ${(props) => props.theme.primary};
  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
    cursor: pointer;
  }
`;

// const image:  = styled.img;
// export const Image = image`
//     height:30px;
//     width:30px;
//     border-radius:50%;
//     border:1px solid black;
//     margin-right:${(props) => props.maringRight && "10px"};
//   }
// `;

import styled, { StyledFunction } from "styled-components";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// const input: StyledFunction<any> = styled.input;
// interface Props {
//   error: any;
// }
export const RadioButton = styled(FormControlLabel)`
  /* width: 100%; */
  /* padding: 12px 20px;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box; */
`;

/* margin: ${(props) => (props.displayError ? "8px 0 0 0" : "8px 0")};
margin: ${(props) => (props.noMargin ? "0" : "8px 0 0 0")};
border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")}; */
// import styled from "styled-components";
// import Button from "@material-ui/core/Button";

// interface Props {
//   name: string;
// }
// export const SuccessButton = styled(Button)<Props>`
//   display: block;
//   margin: auto;
//   padding: 0.75em 1.7em;
//   background: rgb(28, 184, 65);
//   color: #fff;
//   &:hover {
//     background: rgb(5, 236, 60);
//     opacity: 0.5;
//   }
// `;

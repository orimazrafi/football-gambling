import styled, { StyledFunction } from "styled-components";

const input: StyledFunction<any> = styled.input;
export const Input = input`
width: 100%;
    padding: 12px 20px;
    margin: ${(props) => (props.displayError ? "8px 0 0 0" : "8px 0")};
    margin: ${(props) => (props.noMargin ? "0" : "8px 0 0 0")};
    border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")};
    display: inline-block;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

import styled, { StyledFunction } from "styled-components";

const input: StyledFunction<any> = styled.input;
export const Input = input`
width: 100%;
    padding: 12px 20px;
    margin: ${(props) => (props.displayError ? "8px 0 0 0" : "8px 0")};
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
`;

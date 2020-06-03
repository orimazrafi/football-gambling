import styled, { StyledFunction } from "styled-components";

const loadingWrapper: StyledFunction<any> = styled.div;
export const LoadingWrapper = loadingWrapper`
    display:flex;
    height:${(props) => props.height};
    width:100%;
    div{
      margin:auto;
    }
  }
`;

import styled, { StyledFunction } from "styled-components";

const listContainer: StyledFunction<any> = styled.ul;
export const ListContainer = listContainer`
    // width:60%;
    // list-style-type: none;
    margin: 30px auto;
    display: flex;
  flex-direction: column;
  /* justify-content: center; */
  margin-top: 50px;
  }
`;

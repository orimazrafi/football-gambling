import styled, { StyledFunction } from "styled-components";

const listItem: StyledFunction<any> = styled.li;
export const ListItem = listItem`
        background-color:#C0C0C9;
        margin:2px;
        display:flex;
        // padding:10px;
        &:hover{
            cursor:pointer;
            background-color:#A9A9A9;
        }


        position: relative;
        // display: block;
        /* flex: 1 1 0px; */
        margin: auto;
        transition: transform 500ms;


  }
`;

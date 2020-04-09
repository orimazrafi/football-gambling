import styled, { StyledFunction } from "styled-components";

const img: StyledFunction<any> = styled.img;
export const DropImage = img`
margin: auto;
height: 200px;
width: 200px;
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

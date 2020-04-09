import styled, { StyledFunction } from "styled-components";

const label: StyledFunction<any> = styled.label;
export const Label = label`
border:2px solid red;
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

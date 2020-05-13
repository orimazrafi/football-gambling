import styled from "styled-components";
const div = styled.div;
export const ScoreItem = div`
    max-width: 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size:2.8vmin;
    text-align: center;
    @media screen and (min-width: 800px) {
        display: inline-block;
        font-size:16px;
      }
`;

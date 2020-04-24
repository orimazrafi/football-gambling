import styled from "styled-components";

const div = styled.div;
export const GambleWrapper = div`
    display: flex;
    margin: auto;
    width: 90%;
    font-size: 2.2vmax;
    justify-content: space-evenly;
    @media screen and (min-width: 700px) {
        width: 80%;
        font-size: 1.7vmax;
        
      }

    
`;

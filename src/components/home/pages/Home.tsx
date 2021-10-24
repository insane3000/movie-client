import React from "react";
import styled from "styled-components";
const HomeSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Roboto 900";
    font-size: 4rem;
  }
`;
const Home = () => {
  return <HomeSt>Home</HomeSt>;
};

export default Home;

import React from "react";
import styled from "styled-components";
const HomeSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
  }
`;
const Home = () => {
  return <HomeSt>Home</HomeSt>;
};

export default Home;

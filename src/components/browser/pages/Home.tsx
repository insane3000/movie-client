import styled from "styled-components";
import Cluster from "../organisms/Cluster";
import JustAdded from "../organisms/JustAdded";
import Navigation from "components/browser/organisms/Navigation";

import Banner from "../organisms/Banner";
import { useCallback, useEffect, useRef, useState } from "react";
const HomeSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    padding-bottom: 2rem;
    /* overflow-y: scroll;
    position: relative; */
  }
`;

const Home = () => {
 
  return (
    <HomeSt>
      <Banner />
      <JustAdded subtitle="Recien Agregados" />
      <Cluster genre="acci" subtitle="Acción" text="" />
      <Cluster genre="comedia" subtitle="Comedia" text="" />
      <Cluster genre="terror" subtitle="Terror" text="" />
      <Cluster genre="animaci" subtitle="Animación" text="" />
      <Cluster genre="drama" subtitle="Drama" text="" />
      <Cluster genre="romance" subtitle="Romance" text="" />
      <Cluster genre="cienc" subtitle="Ciencia ficción" text="" />
    </HomeSt>
  );
};

export default Home;

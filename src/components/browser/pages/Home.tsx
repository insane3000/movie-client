import styled from "styled-components";
import Cluster from "../organisms/Cluster";
import JustAdded from "../organisms/JustAdded";

import Banner from "../organisms/Banner";
const HomeSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
  }
`;

const Home = () => {
  return (
    <HomeSt>
      <Banner />
      <JustAdded subtitle="Recien Agregados" />

      <Cluster genre="accion" subtitle="Acción" text="" />
      <Cluster genre="animacion" subtitle="Animación" text="" />
      <Cluster genre="aventura" subtitle="Accion" text="" />
      <Cluster genre="sci-fi" subtitle="Ciencia ficción" text="" />
      <Cluster genre="comedia" subtitle="Comedia" text="" />
      <Cluster genre="drama" subtitle="Drama" text="" />
      <Cluster genre="fantasia" subtitle="Fantasia" text="" />
      <Cluster genre="romance" subtitle="Romance" text="" />
      <Cluster genre="terror" subtitle="Terror" text="" />
      <Cluster genre="thriller" subtitle="Thriller" text="" />
    </HomeSt>
  );
};

export default Home;

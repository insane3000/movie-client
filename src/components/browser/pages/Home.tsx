import styled from "styled-components";
import Cluster from "../organisms/Cluster";
import JustAdded from "../organisms/JustAdded";

// import Banner from "../organisms/Banner";
import Banner2 from "../organisms/Banner2";
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
      {/* <Banner /> */}
      <Banner2 />
      <JustAdded subtitle="Recien Agregados" />

      <Cluster genre="accion" subtitle="Acción" text="" />
      <Cluster genre="animacion" subtitle="Animación" text="" />
      <Cluster genre="anime" subtitle="Anime" text="" />
      <Cluster genre="aventura" subtitle="Aventura" text="" />
      <Cluster genre="belico" subtitle="Bélico" text="" />
      <Cluster genre="ciencia-ficcion" subtitle="Ciencia ficción" text="" />
      <Cluster genre="comedia" subtitle="Comedia" text="" />
      <Cluster genre="documental" subtitle="Documental" text="" />
      <Cluster genre="drama" subtitle="Drama" text="" />
      <Cluster genre="fantasia" subtitle="Fantasia" text="" />
      <Cluster genre="intriga" subtitle="Intriga" text="" />
      <Cluster genre="romance" subtitle="Romance" text="" />
      <Cluster genre="terror" subtitle="Terror" text="" />
      <Cluster genre="thriller" subtitle="Thriller" text="" />
      <Cluster genre="western" subtitle="Western" text="" />
    </HomeSt>
  );
};

export default Home;

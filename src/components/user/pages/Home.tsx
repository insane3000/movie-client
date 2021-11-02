import styled from "styled-components";
// import ReactPlayer from "react-player";
import Cluster from "../organisms/Cluster";
const HomeSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  overflow-y: scroll;
  overflow-x: hidden;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    overflow-y: scroll;
    overflow-x: hidden;
    /* margin-top: 3rem; */
  }
`;
const Home = () => {
  return (
    <HomeSt>
      {/* <MoviesGenderCluster
        subtitle="Estrenos"
        text="Ir a todos los estrenos."
      /> */}
      <Cluster genre="acci" subtitle="Accion" text="Ir a accion." />
      <Cluster genre="comedia" subtitle="Comedia" text="Ir a comedia." />
      <Cluster genre="terror" subtitle="Terror" text="Ir a terror." />
    </HomeSt>
  );
};

export default Home;

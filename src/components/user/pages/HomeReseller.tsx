import styled from "styled-components";
// import ReactPlayer from "react-player";
import MoviesGenderCluster from "../organisms/MoviesGenderCluster";
const HomeResellerSt = styled.div`
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
const HomeReseller = () => {
  return (
    <HomeResellerSt>
      <MoviesGenderCluster
        subtitle="Estrenos"
        text="Ir a todos los estrenos."
      />
      <MoviesGenderCluster subtitle="Accion" text="Ir a accion." />
      <MoviesGenderCluster subtitle="Comedia" text="Ir a comedia." />
      <MoviesGenderCluster subtitle="Terror" text="Ir a terror." />
    </HomeResellerSt>
  );
};

export default HomeReseller;

import styled from "styled-components";
// import ReactPlayer from "react-player";
import Pattern from "img/pattern.png";
import MoviesGenderCluster from "../organisms/MoviesGenderCluster";
import Navigation from "../organisms/Navigation";
const HomeResellerSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
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
      <MoviesGenderCluster subtitle="Estrenos" />
      <MoviesGenderCluster subtitle="Accion" />
      <MoviesGenderCluster subtitle="Comedia" />
      <MoviesGenderCluster subtitle="Terror" />
    </HomeResellerSt>
  );
};

export default HomeReseller;

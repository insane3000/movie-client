import { StoreInterface } from "interfaces/storeTemplate";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restartScroll } from "redux/actions/appAction";
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
  const homeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const restoreScroll = () => {
    dispatch(
      restartScroll(
        "home",
        homeRef.current === null ? 0 : homeRef.current.scrollTop
      )
    );
  };
  useEffect(() => {
    homeRef.current && (homeRef.current.scrollTop = app.scroll.home);
  });
  return (
    <HomeSt ref={homeRef} onClick={restoreScroll}>
      {/* <MoviesGenderCluster
        subtitle="Estrenos"
        text="Ir a todos los estrenos."
      /> */}
      <Cluster genre="acci" subtitle="Acción" text="Ir a Acción." />
      <Cluster genre="comedia" subtitle="Comedia" text="Ir a comedia." />
      <Cluster genre="terror" subtitle="Terror" text={"Ir a terror."} />
      <Cluster genre="animaci" subtitle="Animación" text={"Ir a Animación ."} />
      <Cluster genre="crime" subtitle="Crimen" text={"Ir a Crimen."} />
      <Cluster
        genre="documental"
        subtitle="Documental"
        text={"Ir a Documental."}
      />
      <Cluster genre="drama" subtitle="Drama" text={"Ir a Drama."} />
      <Cluster genre="music" subtitle="Musicales" text={"Ir a Musicales."} />
      <Cluster genre="romance" subtitle="Romance" text={"Ir a Romance."} />
      <Cluster
        genre="cienc"
        subtitle="Ciencia ficción"
        text={"Ir a Ciencia ficción."}
      />
    </HomeSt>
  );
};

export default Home;

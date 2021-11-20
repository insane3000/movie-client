import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import { StoreInterface } from "interfaces/storeTemplate";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restartScroll } from "redux/actions/appAction";
import styled from "styled-components";
// import ReactPlayer from "react-player";
import Cluster from "../organisms/Cluster";
import JustAdded from "../organisms/JustAdded";
const HomeSt = styled.div`
  width: 100%;
  height: auto;
  color: white;
  /* overflow-y: scroll;
  overflow-x: hidden; */
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
    background: #0a0a0a;
    /* overflow-y: scroll;
    overflow-x: hidden; */
    /* margin-top: 3rem; */
  }
`;
const Home = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const restoreScroll = () => {
    dispatch(restartScroll("home", homeRef.current === null ? 0 : homeRef.current.scrollTop));
  };
  useEffect(() => {
    homeRef.current && (homeRef.current.scrollTop = app.scroll.home);
  });
  const [page, setPage] = useState(2);

  // !Logica para infinite scroll
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      rootMargin: "200px",
      threshold: 0, //trigger event as soon as the element is in the viewport.
    },
    false // don't remove the observer after intersected.
  );

  useEffect(() => {
    //load next page when bottom is visible
    // isBottomVisible && setNextPage(nextPage + 1);
    if (isBottomVisible) {
      page <= 8 && setPage(page + 1);
    }
  }, [isBottomVisible]);
  return (
    <HomeSt ref={homeRef} onClick={restoreScroll}>
      <JustAdded subtitle="Recien Agregados" />
      <Cluster genre="acc" subtitle="Acción" text="" />
      {page >= 3 && <Cluster genre="comedia" subtitle="Comedia" text="" />}
      {page >= 4 && <Cluster genre="terror" subtitle="Terror" text="" />}
      {page >= 5 && <Cluster genre="animaci" subtitle="Animación" text="" />}
      {page >= 6 && <Cluster genre="drama" subtitle="Drama" text="" />}
      {page >= 7 && <Cluster genre="romance" subtitle="Romance" text="" />}
      {page >= 8 && <Cluster genre="cienc" subtitle="Ciencia ficción" text="" />}
      <section
        ref={ref}
        style={{ width: "100%", height: "2rem", background: "transparent" }}
      ></section>
    </HomeSt>
  );
};

export default Home;

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { URI } from "config/axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer, restartScroll } from "redux/actions/appAction";
import { useNavigate } from "react-router";
// import Navigation from "components/browser/organisms/Navigation";
// *images
import Loading from "img/loading.gif";
import { loadavg } from "os";
const AllMoviesSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    background: #1d1d1d;
    width: 100%;
    height: auto;
    /* overflow-y: scroll; */
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    /* overflow-y: scroll; */
    .title-component {
      width: 80%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 900";
      font-size: 4rem;
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1rem;
      color: #c5c5c5;
    }
    .container-movies {
      width: 80%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 13rem));
      grid-auto-rows: 23rem;
      justify-content: center;
      align-content: flex-start;
      gap: 2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .pagination {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const ContainerSt = styled.div`
  width: 80vw;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 13rem));
  grid-auto-rows: 23rem;
  justify-content: center;
  align-content: flex-start;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
interface MovieIT {
  _id: "";
  title: "";
  rating: 0;
  year: "";
  genre: "";
  time: "";
  actors: "";
  synopsis: "";
  link: "";
  imageXL: "";
  imageL: "";
  imageM: "";
  imageS: "";
}
type Movies = [MovieIT];
const AllMovies = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const moviesRef = useRef<HTMLDivElement>(null);
  const app = useSelector((store: StoreInterface) => store.app);

  const [items, setItems] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(2);

  // !Fetch data
  const firstData = () => {
    axios
      .get(`${URI}/movies`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setItems(response.data.docs);
        setHasMore(response.data.hasNextPage);
        setNextPage(response.data.nextPage);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        navigate(`/`);
      });
  };
  useEffect(() => {
    firstData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    moviesRef.current && (moviesRef.current.scrollTop = app.scroll.movies);
  });

  // !Funciones para infinity scroll
  const fetchData = async () => {
    axios
      .get(`${URI}/movies?page=${nextPage}&limit=10`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setItems((prev: any) => [...prev, ...response.data.docs]);
        setHasMore(response.data.hasNextPage);
        setNextPage(response.data.nextPage);
      });
  };

  return (
    <AllMoviesSt ref={moviesRef}>
      {/* <Navigation /> */}
      <h2 className="title-component">Películas</h2>

      {/* <div className="pagination"> */}
      {/* {page > 1 && <button onClick={handlePrevious}>Pagina Anterior</button>}
        {page <= totalPages - 1 && <button onClick={handleNext}>Pagina Siguiente</button>} */}
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<img src={Loading} alt="spinner" />}
        endMessage={
          <button style={{ textAlign: "center" }}>
            <b>Nada mas que mostrar</b>
          </button>
        }
      >
        <ContainerSt>
          {items?.map((i: any) => (
            <MoviePoster key={i._id} id={i._id} img={i.imageM} rating={i.rating} title={i.title} />
          ))}
        </ContainerSt>
      </InfiniteScroll>
      <img src="" alt="" />
    </AllMoviesSt>
  );
};

export default AllMovies;

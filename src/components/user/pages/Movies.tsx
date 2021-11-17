import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";

import axios from "axios";
import { URI } from "config/axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer, restartScroll } from "redux/actions/appAction";
import { useNavigate } from "react-router";
const AllMoviesSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;
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

  const [state, setState] = useState<Movies>();
  let [totalPages, setTotalPages] = useState(1);
  let [page, setPage] = useState(1);

  // !Handle Pagination
  const handlePrevious = () => {
    page > 1 && setPage((page -= 1));
  };
  const handleNext = () => {
    page <= totalPages - 1 && setPage((page += 1));
  };
  // console.log(totalPages);
  // console.log(page);
  // !Fetch data
  const fetchData = () => {
    axios
      .get(`${URI}/movies?page=${page}&limit=5`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setState(response.data.docs);
        setTotalPages(response.data.totalPages);
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const restoreScroll = () => {
    // console.log(moviesRef);
    dispatch(restartScroll("movies", moviesRef.current === null ? 0 : moviesRef.current.scrollTop));
  };
  useEffect(() => {
    moviesRef.current && (moviesRef.current.scrollTop = app.scroll.movies);
  });
  return (
    <AllMoviesSt ref={moviesRef} onClick={restoreScroll}>
      <h2 className="title-component">Películas</h2>
      <div className="container-movies">
        {state?.map((i) => (
          <MoviePoster key={i._id} id={i._id} img={i.imageM} rating={i.rating} title={i.title} />
        ))}
      </div>
      <div className="pagination">
        {page > 1 && <button onClick={handlePrevious}>Pagina Anterior</button>}
        {page <= totalPages - 1 && <button onClick={handleNext}>Pagina Siguiente</button>}
      </div>
    </AllMoviesSt>
  );
};

export default AllMovies;

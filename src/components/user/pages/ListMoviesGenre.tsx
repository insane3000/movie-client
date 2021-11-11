import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";

import axios from "axios";
import { useParams } from "react-router-dom";
import { URI } from "config/axios";
import { StoreInterface } from "interfaces/storeTemplate";
import { useDispatch, useSelector } from "react-redux";
import { loginServer } from "redux/actions/appAction";
import { useNavigate } from "react-router";

const AllMoviesSt = styled.div`
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
      text-transform: capitalize;
    }
    .container-movies {
      width: 80%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 18rem));
      /* grid-template-columns: 18rem 18rem 18rem 18rem; */
      grid-auto-rows: 28rem;
      justify-content: center;
      align-content: flex-start;
      gap: 1rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
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
  image: "";
}
type Movies = [MovieIT];
// interface Params {
//   genre: string;
// }
const ListMoviesGenre = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const app = useSelector((store: StoreInterface) => store.app);
  const [state, setState] = useState<Movies>();
  // console.log(params.genre);
  const fetchData = () => {
    axios
      .get(`${URI}/genre/${params.genre}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // history.push(`/admin/login`);
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
  }, []);

  let genero = "";
  switch (params?.genre) {
    case "acci":
      genero = "Acción";
      break;
    case "comedia":
      genero = "Comedia";
      break;
    case "terror":
      genero = "Terror";
      break;
    case "animaci":
      genero = "Animacion";
      break;
    case "crime":
      genero = "Crimen";
      break;
    case "documental":
      genero = "Documental";
      break;
    case "drama":
      genero = "Drama";
      break;
    case "music":
      genero = "Musicales";
      break;
    case "romance":
      genero = "Romance";
      break;
    case "cienc":
      genero = "Ciencia Ficcion";
      break;
    default:
      break;
  }
  // console.log(genero);
  return (
    <AllMoviesSt>
      <h2 className="title-component">{genero}</h2>
      <div className="container-movies">
        {state?.map((i) => (
          <MoviePoster key={i._id} img={i.image} id={i._id} rating={i.rating} />
        ))}
      </div>
    </AllMoviesSt>
  );
};

export default ListMoviesGenre;

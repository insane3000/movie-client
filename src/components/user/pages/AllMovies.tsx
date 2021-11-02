import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";

import axios from "axios";
import { URI } from "config/axios";
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
const AllMovies = () => {
  const [state, setState] = useState<Movies>();
  // console.log(state);
  const fetchData = () => {
    axios
      .get(`${URI}/book`)
      .then(function (response: any) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // history.push(`/admin/login`);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AllMoviesSt>
      <h2 className="title-component">Películas</h2>
      <div className="container-movies">
        {state?.map((i) => (
          <MoviePoster key={i.title} img={i.image} id={i._id} />
        ))}
      </div>
      <span>pagination</span>
    </AllMoviesSt>
  );
};

export default AllMovies;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";

import axios from "axios";
const AllMoviesSt = styled.div`
  width: 100%;
  height: 100%;

  .container-movies {
    width: 100%;
    height: 100%;
    display: grid;
    /* grid-template-columns: repeat(2, 20rem); */
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 20rem));

    grid-auto-rows: 30rem;
    justify-content: center;
    align-content: flex-start;
    gap: 1rem;
    overflow-y: scroll;
    padding: 2rem 2rem;
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;

    .container-movies {
      width: 100%;
      height: 100%;
      display: grid;
      /* grid-template-columns: repeat(4, 20rem); */

      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
      grid-auto-rows: 35rem;
      justify-content: center;
      align-content: flex-start;
      gap: 1rem;
      overflow-y: scroll;
      padding: 2rem 10rem;
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
  console.log(state);
  const fetchData = () => {
    axios
      .get(`http://192.168.0.148:5000/book`)
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
      <div className="container-movies">
        {state?.map((i) => (
          <MoviePoster key={i.title} img={i.image} id={i._id} />
        ))}
      </div>
    </AllMoviesSt>
  );
};

export default AllMovies;

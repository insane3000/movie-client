import React from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";
// *Images
import movie01 from "img/posters/movie01.jpg";
import movie02 from "img/posters/movie02.jpg";
import movie03 from "img/posters/movie03.jpg";
import movie04 from "img/posters/movie04.jpg";
import movie05 from "img/posters/movie05.jpg";
import movie06 from "img/posters/movie06.png";
import movie07 from "img/posters/movie07.jpg";
import movie08 from "img/posters/movie08.jpg";
import movie09 from "img/posters/movie09.jpg";
import movie10 from "img/posters/movie10.jpg";
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
const AllMovies = () => {
  return (
    <AllMoviesSt>
      <div className="container-movies">
        <MoviePoster img={movie03} id={"asdasd"} rating={0} />
        <MoviePoster img={movie04} id={"asdasd"} rating={0} />
        <MoviePoster img={movie01} id={"asdasd"} rating={0} />
        <MoviePoster img={movie02} id={"asdasd"} rating={0} />
        <MoviePoster img={movie07} id={"asdasd"} rating={0} />
        <MoviePoster img={movie08} id={"asdasd"} rating={0} />
        <MoviePoster img={movie05} id={"asdasd"} rating={0} />
        <MoviePoster img={movie06} id={"asdasd"} rating={0} />
        <MoviePoster img={movie09} id={"asdasd"} rating={0} />
        <MoviePoster img={movie10} id={"asdasd"} rating={0} />
      </div>
    </AllMoviesSt>
  );
};

export default AllMovies;

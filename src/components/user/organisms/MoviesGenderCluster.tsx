import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//*Icons
import ArrowLeftIcon from "icons/ArrowLeftIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";
// import PlayICon from "icons/PlayIcon";
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
// import movie10 from "img/posters/movie10.jpg";
// import play from "img/play.png";
import MoviePoster from "../molecules/MoviePoster";
const MoviesGenderSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  /* margin-top: 1rem; */
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 35rem;
    margin-top: 4rem;
    margin-bottom: 4rem;
    .subtitle {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: start;
      align-items: center;
      .text {
        margin-left: 4rem;
        font-family: "Roboto 700";
        font-size: 2rem;
        text-decoration: none;
        color: white;
      }
    }
    .movies-gender {
      width: 100%;
      height: calc(100% - 3rem);
      display: grid;
      grid-template-columns: 4rem calc(100% - 8rem) 4rem;
      .arrow {
        background: #00000092;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          .sysIconArrow {
            color: white;
          }
        }
        .sysIconArrow {
          color: #ffffff2f;
          width: 100%;
          height: 3rem;
        }
      }
      .list-movies-gender {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(10, 20rem);
        grid-template-rows: 100%;
        gap: 0.5rem;
        overflow-x: scroll;
        overflow-y: hidden;
        .toGenre {
          background: #00000030;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Roboto 100";
          font-size: 2rem;
          text-decoration: none;
          color: #ffffff6c;
          padding: 0 2rem;
          text-align: center;
          &:hover{
            background: #120825;
            color: white;
          }
        }
      }
    }
  }
`;
interface Props {
  subtitle: string;
  text: string;
}
const MoviesGender = (props: Props) => {
  const moviesGender = useRef<any>();
  const ScrollRight = () => {
    moviesGender.current.scrollLeft += 1000;
    console.log(moviesGender);
  };
  const ScrollLeft = () => {
    moviesGender.current.scrollLeft -= 1000;
  };
  return (
    <MoviesGenderSt>
      <div className="subtitle">
        <Link className="text" to="/reseller/genre/asdasd">
          {props.subtitle}
        </Link>
      </div>
      <div className="movies-gender">
        <section className="arrow" onClick={ScrollLeft}>
          <ArrowLeftIcon className="sysIconArrow" />
        </section>
        <div ref={moviesGender} className="list-movies-gender">
          <MoviePoster img={movie01} />
          <MoviePoster img={movie02} />
          <MoviePoster img={movie03} />
          <MoviePoster img={movie04} />
          <MoviePoster img={movie05} />
          <MoviePoster img={movie06} />
          <MoviePoster img={movie07} />
          <MoviePoster img={movie08} />
          <MoviePoster img={movie09} />

          <Link className="toGenre" to={`/reseller/genre/genreparams`}>
            <div className="end-cluster">
              <span className="text">{props.text}</span>
            </div>
          </Link>
        </div>
        <section className="arrow" onClick={ScrollRight}>
          <ArrowRightIcon className="sysIconArrow" />
        </section>
      </div>
    </MoviesGenderSt>
  );
};

export default MoviesGender;

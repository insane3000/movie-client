// import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// *Images
// import movie01 from "img/posters/movie01.jpg";
import play from "img/play.png";
const MoviesPosterSt = styled.div`
  width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    overflow: hidden;
    .toMovie {
      width: 100%;
      height: 100%;
      text-decoration: none;

      overflow: hidden;
      position: relative;
      justify-content: center;
      align-items: center;
      /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */

      &:hover {
        .gradient {
          display: flex;
        }
      }
      .poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .gradient {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.1s;
        position: absolute;
        top: 0;
        background: rgb(0, 0, 0);
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.969625350140056) 0%,
          rgba(253, 187, 45, 0) 100%
        );
        display: none;
        .rating {
          position: absolute;
          bottom: 1rem;
          font-family: "Roboto 900";
          font-size: 4rem;
          text-shadow: 2px 2px 3px #000000;
          color: white;
          .barra {
            font-family: "Roboto 900";
            font-size: 2rem;
          }
        }
        .play-icon {
          width: 5rem;
          width: 5rem;
          position: absolute;
          font-size: 5rem;
          color: white;
          -webkit-filter: invert(100%);
          filter: invert(100%);
          /* text-shadow: 20px 20px 10px #000000; */
        }
      }
    }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    overflow: hidden;
    .toMovie {
      width: 100%;
      height: 100%;
      text-decoration: none;

      overflow: hidden;
      position: relative;
      justify-content: center;
      align-items: center;
      /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */

      &:hover {
        .gradient {
          display: flex;
        }
      }
      .poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .gradient {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.1s;
        position: absolute;
        top: 0;
        background: rgb(0, 0, 0);
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.969625350140056) 0%,
          rgba(253, 187, 45, 0) 100%
        );
        display: none;
        .rating {
          position: absolute;
          bottom: 1rem;
          font-family: "Roboto 900";
          font-size: 4rem;
          text-shadow: 2px 2px 3px #000000;
          color: white;
          .barra {
            font-family: "Roboto 900";
            font-size: 2rem;
          }
        }
        .play-icon {
          width: 5rem;
          width: 5rem;
          position: absolute;
          font-size: 5rem;
          color: white;
          -webkit-filter: invert(100%);
          filter: invert(100%);
          /* text-shadow: 20px 20px 10px #000000; */
        }
      }
    }
  }
`;
interface Props {
  img: string;
}
const MoviePoster = (props: Props) => {
  return (
    <MoviesPosterSt>
      <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
        <img className="poster" src={props.img} alt="Movie" loading="lazy" />
        <div className="gradient">
          <span className="rating">
            6.8<span className="barra">/10</span>
          </span>
          <img className="play-icon" src={play} alt="play-icon" />
        </div>
      </Link>
    </MoviesPosterSt>
  );
};

export default MoviePoster;

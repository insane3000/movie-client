// import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BUCKET } from "config/bucket";
// *Images
import Spinner04 from "../atoms/Spinner04";
import play from "img/play.png";
import { useState } from "react";
// import SpinnerImg from "../atoms/SpinnerImg";
const MoviesPosterSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 13rem;
    height: 20rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    /* background: red; */
    margin-bottom: 2rem;
    .container-poster {
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 0.5rem;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      border: 0.125rem solid transparent;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      &:hover {
        border: 0.125rem solid #ffffff;
        .gradient {
          display: flex;
        }
      }
      .poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .sysSvg {
        width: 100%;
        height: 100%;
      }
      .gradient {
        position: absolute;
        width: 100%;
        height: 100%;
        text-decoration: none;
        overflow: hidden;
        position: relative;
        display: none;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        background: rgb(0, 0, 0);
        background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 0.969625350140056) 0%,
          rgba(253, 187, 45, 0) 100%
        );

        .play-icon {
          width: 2rem;
          width: 2rem;
          position: absolute;
          font-size: 5rem;
          color: white;
          -webkit-filter: invert(100%);
          filter: invert(100%);
        }
      }
    }
    /* .title-movie {
      width: 100%;
      height: 3rem;
      color: #b3b3b3;
      font-family: "Roboto 300";
      font-size: 1rem;
      line-height: 3rem;
      padding: 0 0.5rem;
      text-decoration: none;
      // !Dots
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: white;
      }
    } */
  }
`;
interface Props {
  img: string;
  id: string;
  rating: Number;
  title: string;
}
const MoviePoster = (props: Props) => {
  const [imageLoad, setImageLoad] = useState(false);
  const handleLoadImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.complete && setImageLoad(true);
  };

  return (
    <MoviesPosterSt>
      <section className="container-poster">
        <img
          className="poster"
          src={`${BUCKET}${props.img}`}
          alt="Movie"
          // loading="lazy"
          onLoad={(e) => handleLoadImg(e)}
        />
        {!imageLoad && <Spinner04 />}
        <Link className="gradient" to={`/browser/movie/${props.id}`}>
          <img className="play-icon" src={play} alt="play-icon" />
        </Link>
      </section>
      {/* <Link className="title-movie" to={`/movie/${props.id}`}>
        {props.title}
      </Link> */}
    </MoviesPosterSt>
  );
};

export default MoviePoster;

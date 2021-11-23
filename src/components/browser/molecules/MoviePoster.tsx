// import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BUCKET } from "config/bucket";
import Spinner04 from "../atoms/Spinner04";
// *Images
// import movie01 from "img/posters/movie01.jpg";
import play from "img/play.png";
// import star from "img/star.png";
import star from "img/star2.png";
import { useState } from "react";
// import SpinnerImg from "../atoms/SpinnerImg";
// *Redux
import { setModal } from "redux/actions/appAction";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";

const MoviesPosterSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 13rem;
    height: 23rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 2rem;
    .container-poster {
      width: 100%;
      height: calc(100% - 3rem);
      /* position: relative; */
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
      .gradient {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        text-decoration: none;
        overflow: hidden;
        /* position: relative; */
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
      /* .year {
        height: 1.2rem;
        line-height: 1.2rem;
        position: absolute;
        top: 0.3rem;
        right: 0.3rem;
        padding: 0rem 0.4rem;
        font-family: "Roboto 900";
        font-size: 1rem;
        color: #000000;
        border-radius: 0.2rem;
        color: white;
        text-shadow: 2px 2px 5px #141414;
      } */
    }
    .name-rating {
      width: 100%;
      height: 3rem;
      padding: 0 0.5rem;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      /* // !Dots
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; */
      span {
        width: 100%;
        height: 1.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /* line-height: 1.5rem; */
        font-size: 1rem;
        line-height: 1.3rem;
      }
      .title {
        font-family: "Roboto 300";
        color: #b3b3b3;
      }
      .rating {
        font-family: "Roboto 900";
        color: #ffffff;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        .star-icon {
          width: 1rem;
          height: 1rem;
          -webkit-filter: invert(100%);
          filter: invert(100%);
          margin-right: 0.2rem;
          margin-top: -0.2rem;
        }
        .year {
          position: absolute;
          right: 0;
          font-family: "Roboto 900";
          font-size: 1rem;
        }
      }
    }
  }
`;
interface Props {
  img: string;
  id: string;
  rating: Number;
  title: string;
  year: string;
}
const MoviePoster = (props: Props) => {
  const dispatch = useDispatch();
  // const app = useSelector((store: StoreInterface) => store.app);
  const [imageLoad, setImageLoad] = useState(false);
  const handleLoadImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.complete && setImageLoad(true);
  };
  // console.log(props);
  const handleModal = (id: string) => {
    console.log(id);
    dispatch(setModal(id, true));
  };

  return (
    <MoviesPosterSt>
      <section className="container-poster">
        <img
          className="poster"
          src={`${BUCKET}${props.img}`}
          alt=""
          // loading="lazy"
          // onLoad={(e) => handleLoadImg(e)}
          onLoad={(e) => handleLoadImg(e)}
        />
        {!imageLoad && <Spinner04 />}
        <section
          className="gradient"
          // to={`/browser/movie/${props.id}`}
          onClick={() => handleModal(props.id)}
        >
          <img className="play-icon" src={play} alt="play-icon" />
        </section>
        {/* <h2 className="year">{props.year}</h2> */}
      </section>
      {/* <Link title-movie to={`/movie/${props.id}`}>
        {props.title}$ 7.5
      </Link> */}
      <div className="name-rating">
        <span className="title">{props.title}</span>
        <span className="rating">
          <img className="star-icon" src={star} alt="star-icon" /> {props.rating}
          <p className="year">{props.year}</p>
        </span>
      </div>
    </MoviesPosterSt>
  );
};

export default MoviePoster;

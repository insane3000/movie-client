import styled from "styled-components";
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
import { useDispatch } from "react-redux";

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
          -webkit-filter: invert(100%);
          filter: invert(100%);
        }
      }
      /* .new {
        position: absolute;
        top: -1rem;
        right: 0;
        width: 30%;
        height: 20%;
        text-decoration: none;
        overflow: hidden;
        background-image: linear-gradient(45deg, #e70000, #ff0000);
        transform: skewY(8deg);
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
          transform: skewY(-8deg);
          margin-top: 1rem;
          font-family: "Roboto 900";
          color: white;
        }
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
          /* -webkit-filter: invert(100%);
          filter: invert(100%); */
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
  const [imageLoad, setImageLoad] = useState(false);
  const handleLoadImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.complete && setImageLoad(true);
  };
  const handleModal = (id: string) => {
    //     console.log(id);
    dispatch(setModal(id, true));
  };

  return (
    <MoviesPosterSt>
      <section className="container-poster">
        <img
          className="poster"
          src={`${process.env.REACT_APP_BUCKET}${props.img}`}
          alt=""
          // loading="lazy"
          // onLoad={(e) => handleLoadImg(e)}
          onLoad={(e) => handleLoadImg(e)}
        />
        {!imageLoad && <Spinner04 />}
        <section className="gradient" onClick={() => handleModal(props.id)}>
          <img className="play-icon" src={play} alt="play-icon" />
        </section>
        {/* <section className="new">
          <span className="text">Nuevo!</span>
        </section> */}
      </section>
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

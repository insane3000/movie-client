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
import play from "img/play.png";
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

        .toMovie {
          text-decoration: none;
          border-radius: 0.5rem;
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
          .end-cluster {
            background: #0c0613;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 1rem;
            .text {
              font-family: "Roboto 300";
              font-size: 2rem;
              color: white;
              text-align:center;

            }
          }
        }
      }
    }
  }
`;
interface Props {
  subtitle: string;
  text:string
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
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie01} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                6.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie02} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                5.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie03} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                6.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie04} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                2.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie05} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                5.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie06} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                6.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie07} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                5.5<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie08} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                3.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/movie/a123c12313123cc`}>
            <img className="poster" src={movie09} alt="Movie" loading="lazy" />
            <div className="gradient">
              <span className="rating">
                1.8<span className="barra">/10</span>
              </span>
              <img className="play-icon" src={play} alt="play-icon" />
            </div>
          </Link>
          <Link className="toMovie" to={`/reseller/genre/asdasd`}>
            {/* <img className="poster" src={movie10} alt="Movie" loading="lazy" /> */}
            <div className="end-cluster">
              <span className="text">{props.text}</span>
              {/* <img className="play-icon" src={play} alt="play-icon" /> */}
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

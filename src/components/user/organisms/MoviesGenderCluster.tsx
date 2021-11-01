import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//*Icons
import ArrowLeftIcon from "icons/ArrowLeftIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";

import MoviePoster from "../molecules/MoviePoster";
import axios from "axios";
const MoviesGenderSt = styled.div`
  width: 100%;
  height: 33rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
  .subtitle {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: start;
    align-items: center;
    .text {
      margin-left: 0.5rem;
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
    /* grid-template-columns: 4rem calc(100% - 8rem) 4rem; */
    grid-template-columns: 100%;

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
    .arrow-none {
      display: none;
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
        &:hover {
          background: #120825;
          color: white;
        }
      }
    }
  }
  /* margin-top: 1rem; */
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 33rem;
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
      .arrow-none {
        display: flex;
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
          background: #1d1231;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Roboto 100";
          font-size: 2rem;
          text-decoration: none;
          color: #ffffff6c;
          padding: 0 2rem;
          text-align: center;
          &:hover {
            background: #1a0f2f;
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
  genre: string;
}
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

const MoviesGender = (props: Props) => {
  const moviesGenderRef = useRef<any>();
  const ScrollRight = () => {
    moviesGenderRef.current.scrollLeft += 1000;
    // console.log(moviesGenderRef);
  };
  const ScrollLeft = () => {
    moviesGenderRef.current.scrollLeft -= 1000;
  };
  const [state, setState] = useState<Movies>();
  // console.log(props.genre);
  const fetchData = () => {
    axios
      .get(`http://192.168.0.148:5000/genre/${props.genre}`)
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
    <MoviesGenderSt>
      <div className="subtitle">
        <Link className="text" to={`/reseller/genre/${props.genre}`}>
          {props.subtitle}
        </Link>
      </div>
      <div className="movies-gender">
        <section className="arrow arrow-none" onClick={ScrollLeft}>
          <ArrowLeftIcon className="sysIconArrow" />
        </section>
        <div ref={moviesGenderRef} className="list-movies-gender">
          {state?.map((i) => (
            <MoviePoster key={i._id} img={i.image} id={i._id} />
          ))}

          <Link className="toGenre" to={`/reseller/genre/${props.genre}`}>
            <div className="end-cluster">
              <span className="text">{props.text}</span>
            </div>
          </Link>
        </div>
        <section className="arrow arrow-none" onClick={ScrollRight}>
          <ArrowRightIcon className="sysIconArrow" />
        </section>
      </div>
    </MoviesGenderSt>
  );
};

export default MoviesGender;
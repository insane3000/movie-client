import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//*Icons
import ArrowLeftIcon from "icons/ArrowLeftIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";

import MoviePoster from "../molecules/MoviePoster";
import axios from "axios";
import { URI } from "config/axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer } from "redux/actions/appAction";
import { useNavigate } from "react-router";

const ClusterSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 31rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title-cluster {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      /* background: red; */
      padding-left: 4rem;
      font-family: "Roboto 700";
      font-size: 2rem;
      text-decoration: none;
      color: white;
    }

    .container-postersArrow {
      width: 100%;
      height: 28rem;
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
      .list-posters {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(10, 18rem);
        grid-template-rows: 100%;
        gap: 1rem;
        overflow-x: scroll;
        overflow-y: hidden;
        .toGenre {
          background: #0d0d0e;
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
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const moviesGenderRef = useRef<any>();
  const app = useSelector((store: StoreInterface) => store.app);
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
      .get(`${URI}/genre/${props.genre}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        navigate(`/`);
      });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ClusterSt>
      <Link className="title-cluster" to={`/genre/${props.genre}`}>
        {props.subtitle}
      </Link>

      <div className="container-postersArrow">
        <section className="arrow arrow-none" onClick={ScrollLeft}>
          <ArrowLeftIcon className="sysIconArrow" />
        </section>
        <div ref={moviesGenderRef} className="list-posters">
          {state?.map((i) => (
            <MoviePoster key={i._id} img={i.image} id={i._id} rating={i.rating} />
          ))}
          <Link className="toGenre" to={`/genre/${props.genre}`}>
            <span className="text">{props.text}</span>
          </Link>
        </div>
        <section className="arrow arrow-none" onClick={ScrollRight}>
          <ArrowRightIcon className="sysIconArrow" />
        </section>
      </div>
    </ClusterSt>
  );
};

export default MoviesGender;

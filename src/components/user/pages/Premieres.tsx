import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";

import axios from "axios";
import { URI } from "config/axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer, restartScroll } from "redux/actions/appAction";
import { useNavigate } from "react-router";
const PremieresSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;
    .title-component {
      width: 80%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 900";
      font-size: 4rem;
      text-align: center;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .container-movies {
      width: 80%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 18rem));
      /* grid-template-columns: 18rem 18rem 18rem 18rem; */
      grid-auto-rows: 28rem;
      justify-content: center;
      align-content: flex-start;
      gap: 1rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
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
  imageXL: "";
  imageL: "";
  imageM: "";
  imageS: "";
}
type Movies = [MovieIT];
const Premieres = () => {
  let navigate = useNavigate();
  const premieresRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const restoreScroll = () => {
    dispatch(
      restartScroll("premieres", premieresRef.current === null ? 0 : premieresRef.current.scrollTop)
    );
  };
  useEffect(() => {
    premieresRef.current && (premieresRef.current.scrollTop = app.scroll.premieres);
  });
  const year = new Date().getFullYear();

  const [state, setState] = useState<Movies>();
  // console.log(state);
  const fetchData = () => {
    axios
      .get(`${URI}/year/${year}`, {
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
        // history.push(`/admin/login`);
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
    <PremieresSt ref={premieresRef} onClick={restoreScroll}>
      <h2 className="title-component">Estrenos</h2>
      <div className="container-movies">
        {state?.map((i) => (
          <MoviePoster key={i._id} img={i.imageM} id={i._id} rating={i.rating} title={i.title} />
        ))}
      </div>
    </PremieresSt>
  );
};

export default Premieres;

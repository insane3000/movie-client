import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MoviePoster from "../molecules/MoviePoster";
import SeriePoster from "../molecules/SeriePoster";
import axios from "axios";
import { useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
// *images
import { useQuery } from "react-query";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const AllMoviesSt = styled.div`
  width: 100%;
  height: auto;
  /* overflow-y: scroll;
    position: relative; */
  .title-component {
    width: 100%;
    height: auto;
    /* line-height: 3rem; */
    font-family: "Roboto 700";
    font-size: 1rem;
    text-align: start;
    /* margin-top: 6rem; */
    color: #d3d3d3;
    padding: 0 1rem;
    /* background: lime; */
  }
  .container-movies {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 9rem));
    grid-auto-rows: 16rem;
    justify-content: center;
    align-content: flex-start;
    gap: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    /* padding: 0 10rem; */
  }
  .pagination {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;

    .btns {
      width: 10rem;
      height: 3rem;
      display: grid;
      grid-template-columns: 3rem 3rem 3rem;
      grid-template-rows: 100%;
      gap: 0.5rem;
      .btn {
        width: 100%;
        height: 100%;
        background: #5100ff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Roboto 900";
        font-size: 1rem;
        color: white;
        border-radius: 0.2rem;
      }
    }
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
    /* overflow-y: scroll;
    position: relative; */
    .title-component {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-align: start;
      /* margin-top: 6rem; */
      color: #d3d3d3;
      padding: 0 10rem;
    }
    .container-movies {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10rem, 13rem));
      grid-auto-rows: 23rem;
      justify-content: center;
      align-content: flex-start;
      gap: 2rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding: 0 10rem;
    }
    .pagination {
      width: 100%;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;

      .btns {
        width: 10rem;
        height: 3rem;
        display: grid;
        grid-template-columns: 3rem 3rem 3rem;
        grid-template-rows: 100%;
        gap: 0.5rem;
        .btn {
          width: 100%;
          height: 100%;
          background: #5100ff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Roboto 900";
          font-size: 1rem;
          color: white;
          border-radius: 0.2rem;
        }
      }
    }
  }
`;

const AllMovies = () => {
  const location = useLocation();
  const paramsLocation = new URLSearchParams(location.search);
  const params = useParams();
  const app = useSelector((store: StoreInterface) => store.app);
  // !Obteniendo los parametros
  const page: any = paramsLocation.get("page");
  // !Fetching Function
  const fetch = async ({ queryKey }: any) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/year?year=${queryKey[0]}&page=${queryKey[1]}&limit=20`,
      {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      }
    );
    return data;
  };
  const year = new Date().getFullYear();
  // !UseQuery
  const { data, isLoading } = useQuery([year, page], fetch, {
    staleTime: 0,
    cacheTime: 0,
  });

  return (
    <AllMoviesSt>
      <h2 className="title-component">Estrenos</h2>
      <div className="container-movies">
        {data?.docs.map((i: any) => {
          return i.type === "movie" ? (
            <MoviePoster
              key={i._id}
              id={i._id}
              img={i.imageM}
              rating={i.rating}
              title={i.title}
              year={i.year}
            />
          ) : (
            <SeriePoster
              key={i._id}
              id={i._id}
              img={i.imageM}
              rating={i.rating}
              title={i.title}
              year={i.year}
            />
          );
        })}
      </div>

      {!isLoading && (
        <div className="pagination">
          <div className="btns">
            {data?.page > 1 ? (
              <Link className="btn" to={`/browser/premieres?page=${parseInt(page) - 1}`}>
                <IoIosArrowBack className="sysIconArrow" />
              </Link>
            ) : (
              <section></section>
            )}
            <div className="btn">{page}</div>
            {page < data?.totalPages ? (
              <Link className="btn" to={`/browser/premieres?page=${parseInt(page) + 1}`}>
                <IoIosArrowForward className="sysIconArrow" />
              </Link>
            ) : (
              <section></section>
            )}
          </div>
        </div>
      )}
    </AllMoviesSt>
  );
};

export default AllMovies;

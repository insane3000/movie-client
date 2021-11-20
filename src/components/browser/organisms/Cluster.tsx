import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//*Icons
import ArrowLeftIcon from "icons/ArrowLeftIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";

import PosterHome from "../molecules/PosterHome";
import axios from "axios";
import { URI } from "config/axios";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer } from "redux/actions/appAction";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import Spinner05 from "../atoms/Spinner05";
const ClusterSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 23rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
    /* background: red; */

    .title-cluster {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      /* background: red; */
      padding-left: 4rem;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-decoration: none;
      color: #d3d3d3;
    }

    .container-postersArrow {
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
      .list-posters {
        width: auto;
        height: 100%;
        display: grid;
        grid-auto-flow: column dense;
        grid-template-rows: 100%;
        gap: 1rem;
        overflow-x: scroll;
        overflow-y: hidden;
        position: relative;
        .loadMore {
          width: 1rem;
          background: transparent;
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
  imageXL: "";
  imageL: "";
  imageM: "";
  imageS: "";
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
  const [state, setState] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  // console.log(props);
  // console.log(props.genre);
  const InitialFetch = () => {
    axios
      .get(`${URI}/genre?genre=${props.genre}&page=${nextPage}&limit=15`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        // setState(response.data.docs);
        setState((prev: any) => [...prev, ...response.data.docs]);
        setNextPage(response.data.nextPage);
        setHasMore(response.data.hasNextPage);
        // console.log(response.data);
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
  // useEffect(() => {
  //   InitialFetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [nextPage]);

  // !Logica para infinite scroll
  const ref = useRef(null);
  const isBottomVisible = useIntersectionObserver(
    ref,
    {
      rootMargin: "0px 400px 0px 400px",
      threshold: 0, //trigger event as soon as the element is in the viewport.
    },
    false // don't remove the observer after intersected.
  );

  useEffect(() => {
    //load next page when bottom is visible
    // isBottomVisible && setNextPage(nextPage + 1);
    if (isBottomVisible) {
      // hasMore && setNextPage(nextPage + 1);
      hasMore && InitialFetch();
    }
    // console.log(" fetch");
  }, [isBottomVisible]);
  return (
    <ClusterSt>
      <h2 className="title-cluster">{props.subtitle}</h2>

      <div className="container-postersArrow">
        <section className="arrow arrow-none" onClick={ScrollLeft}>
          <ArrowLeftIcon className="sysIconArrow" />
        </section>

        <div ref={moviesGenderRef} className="list-posters">
          {state?.map((i: any) => (
            <PosterHome key={i._id} img={i.imageM} id={i._id} rating={i.rating} title={i.title} />
          ))}

          <section ref={ref} className="loadMore"></section>
          {state.length === 0 && <Spinner05 />}
        </div>

        <section className="arrow arrow-none" onClick={ScrollRight}>
          <ArrowRightIcon className="sysIconArrow" />
        </section>
      </div>
    </ClusterSt>
  );
};

export default MoviesGender;

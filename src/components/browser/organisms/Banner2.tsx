import React, { useEffect, useState } from "react";
import styled from "styled-components";
// *Images
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "redux/actions/appAction";
import axios from "axios";
import { StoreInterface } from "interfaces/storeTemplate";
import Spinner05 from "../atoms/Spinner05";
import { useLocation, useNavigate } from "react-router-dom";
const Banner2St = styled.div`
  width: 100vw;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  top: 0;
  .image-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
  .gradient-top {
    width: 100%;
    height: 100%;
    position: absolute;

    background: rgb(7, 7, 7);
    background: linear-gradient(180deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 10%);
  }
  .gradient-bottom {
    width: 100%;
    height: 100%;
    position: absolute;
    backdrop-filter: none;
    background: rgb(7, 7, 7);
    background: linear-gradient(0deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 90%);
  }
  .data-poster {
    width: 90%;
    height: auto;
    position: absolute;
    bottom: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background: red; */
    .data {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      /* padding-right: 1rem; */
      .banner-title {
        width: 100%;
        height: auto;
        font-family: "Roboto 900";
        font-size: 2rem;
        line-height: 2rem;
        color: white;
        text-shadow: 1px 1px 5px black;
        text-align: center;
      }
      .genre {
        font-family: "Roboto 300";
        font-size: 1rem;
        color: white;
        text-shadow: 1px 1px 3px black;
      }
      .rating {
        font-family: "Roboto 900";
        font-size: 2rem;
        color: white;
        text-shadow: 1px 1px 3px black;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .out-of {
          font-family: "Roboto 100";
          line-height: 1rem;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          color: white;
          text-shadow: 1px 1px 3px black;
        }
      }
      .btn-container {
        height: 2rem;
        text-shadow: 1px 1px 3px black;
        display: flex;
        justify-content: center;
        align-items: center;
        .button-play {
          background: white;
          width: 7rem;
          height: 2rem;
          border-style: none;
          border-radius: 0.3rem;
          font-family: "Roboto 900";
          font-size: 1rem;
          color: #000000;
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          transition: 0.1s;

          &:hover {
            background: #dfdfdf;
            transition: 0.1s;
          }
        }
      }
    }
    .poster {
      width: auto;
      height: 100%;
      object-fit: contain;
      display: none;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }
  .spinnerPoster {
    width: 100%;
    height: 100%;
    top: 0;
    position: absolute;
    background: #070707;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 10rem;
  }

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100vw;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute;
    top: 0;
    .image-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
      filter: blur(50px) brightness(20%);
    }
    .gradient-top {
      width: 100%;
      height: 100%;
      position: absolute;

      background: rgb(7, 7, 7);
      background: linear-gradient(180deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 30%);
    }
    .gradient-bottom {
      width: 100%;
      height: 100%;
      position: absolute;
      /* backdrop-filter: blur(50px) brightness(20%); */
      background: rgb(7, 7, 7);
      background: linear-gradient(0deg, rgba(7, 7, 7, 1) 0%, rgba(255, 0, 0, 0) 80%);
    }
    .data-poster {
      width: 85%;
      height: 75%;
      position: absolute;
      bottom: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .data {
        width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-right: 1rem;
        .banner-title {
          width: 100%;
          height: auto;
          font-family: "Roboto 900";
          font-size: 5vw;
          line-height: 5vw;
          color: white;
          text-shadow: 5px 5px 10px black;
          text-align: start;
        }
        .genre {
          font-family: "Roboto 300";
          font-size: 3vw;
          color: white;
          text-shadow: 3px 3px 10px black;
        }
        .rating {
          font-family: "Roboto 900";
          font-size: 3.5vw;
          color: white;
          text-shadow: 3px 3px 10px black;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          .out-of {
            font-family: "Roboto 100";
            line-height: 1vw;
            margin-bottom: 1.5vw;
            font-size: 1vw;
            color: white;
            text-shadow: 1px 1px 3px black;
          }
        }
        .btn-container {
          height: 5rem;
          text-shadow: 1px 1px 3px black;
          display: flex;
          justify-content: center;
          align-items: center;
          .button-play {
            background: white;
            width: 15rem;
            height: 3rem;
            border-style: none;
            border-radius: 0.3rem;
            font-family: "Roboto 900";
            font-size: 1.5rem;
            color: #000000;
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            transition: 0.1s;

            &:hover {
              background: #dfdfdf;
              transition: 0.1s;
            }
          }
        }
      }
      .poster {
        width: auto;
        height: 100%;
        object-fit: contain;
        display: flex;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
    }
    .spinnerPoster {
      width: 100%;
      height: 100%;
      top: 0;
      position: absolute;
      background: #070707;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 10rem;
    }
  }
`;
interface MovieIT {
  actors: string;
  available: true;
  createdAt: string;
  folder: string;
  genre: string;
  imageL: string;
  imageM: string;
  imageS: string;
  imageXL: string;
  language: string;
  link: string;
  originalTitle: string;
  rating: number;
  server: string;
  synopsis: string;
  time: string;
  title: string;
  updatedAt: string;
  year: string;
  _id: string;
}
const Banner = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  // ! States
  const [state, setState] = useState<MovieIT>();

  const [spinnerPoster, setSpinnerPoster] = useState(true);
  // !Spinner Poster
  const handleLoadImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.complete && setSpinnerPoster(false);
  };

  //! Handle modal
  const handleModal = (id: string) => {
    dispatch(setModal(id, true));
    !app.modal.show && navigate(pathname);
  };
  const fetchData = async () => {
    axios
      //       .get(`${process.env.REACT_APP_BACKEND_URL}/movies/${"61aa49e53cda0c8683b6d6cf"}`, {
      .get(`${process.env.REACT_APP_BACKEND_URL}/last-premiere?limit=3`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response) {
        //TODO Por cada nuevo dato seteado, se renderiza de nuevo. fixear!!!
        // setTitle(response.data.title);
        // setRating(response.data.rating);
        // setGenre(response.data.genre);
        // setMovieId(response.data.movieId);
        // setBanner(response.data.banner);

        setState(response.data.docs[Math.floor(Math.random() * 3)]);
        // console.log(Math.random() * 5);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //   console.log(state);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cleanText = state?.genre.replace("|", ".");

  return (
    <Banner2St>
      <img
        className="image-bg"
        src={`${process.env.REACT_APP_BUCKET}${state?.imageL}`}
        alt=""
        onLoad={(e) => handleLoadImg(e)}
      />
      <div className="gradient-top"></div>
      <div className="gradient-bottom"></div>

      <div className="data-poster">
        <div className="data">
          <h1 className="banner-title">{state?.title}</h1>
          <section className="genre">
            {cleanText?.split(".")[0]} {cleanText?.split(".")[1] && "•"} {cleanText?.split(".")[1]}{" "}
            {cleanText?.split(".")[2] && "•"} {cleanText?.split(".")[2]}
          </section>
          <h3 className="rating">
            {state?.rating}
            <span className="out-of">/10</span>{" "}
          </h3>
          <section className="btn-container">
            <button className="button-play" onClick={() => handleModal(`${state?._id}`)}>
              Ver Ahora
            </button>
          </section>
        </div>
        <img className="poster" src={`${process.env.REACT_APP_BUCKET}${state?.imageL}`} alt="" />
      </div>

      {spinnerPoster && (
        <section className="spinnerPoster">
          <Spinner05 />
        </section>
      )}
    </Banner2St>
  );
};

export default Banner;

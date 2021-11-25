import styled from "styled-components";
import ReactJWPlayer from "react-jw-player";
import Cluster from "../organisms/Cluster";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URI } from "config/axios";
import { BUCKET } from "config/bucket";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer, setModal } from "redux/actions/appAction";
// *Icons
import CloseIcon from "icons/CloseIcon";
import Spinner05 from "../atoms/Spinner05";
import star from "img/star2.png";
const MovieSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .sysClose {
      position: absolute;
      top: 1.5rem;
      right: 5.5rem;
      font-size: 2.5rem;
      background: white;
      border-radius: 100%;
      color: black;
      cursor: pointer;
    }
    .gradient-movie {
      width: 100%;
      height: 100%;
      background: #00000026;
      position: absolute;
      backdrop-filter: blur(10px);
    }

    .loader {
      width: 80vw;
      height: 90vh;
      background: #1a1720;
      background: #0f0f0f;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 2rem;
      position: absolute;
      z-index: 2;
    }
    .movie-container {
      width: 80vw;
      height: 90vh;
      background: #1a1720;
      background: #0f0f0f;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      padding-bottom: 2rem;
      overflow-y: scroll;
      z-index: 1;

      .container-poster-data {
        width: 65rem;
        height: auto;
        display: flex;
        margin-top: 4rem;

        .container-poster {
          width: 13rem;
          height: 23rem;
          position: relative;
          border-radius: 0.5rem;
          overflow: hidden;
          .img-movie {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .container-data {
          width: calc(100% - 13rem);
          height: auto;
          padding: 1rem 1rem;
          .title-movie {
            font-family: "Roboto 900";
            font-size: 3rem;
            line-height: 3rem;
            margin-bottom: 0.5rem;
            text-align: left;
            color: #5900ff;
          }
          .year-genre-time {
            font-family: "Roboto 100";
            font-size: 1.2rem;
            text-align: left;
            color: white;
            margin-bottom: 0.5rem;
          }

          .rate {
            font-family: "Roboto 900";
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;
            /* background: #772121; */
            display: flex;
            justify-content: start;
            align-items: center;

            .span {
              color: #6200ff;
              font-family: "Roboto 900";
              font-size: 1.5rem;
              margin-right: 0.5rem;
            }
          }
          .actors {
            width: 100%;
            height: 2rem;
            font-family: "Roboto 100";
            font-size: 1.5rem;
            color: white;
            margin-bottom: 0.5rem;

            // !Dots ...
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .span {
              color: #6200ff;
              font-family: "Roboto 900";
              font-size: 1.5rem;
              margin-right: 0.5rem;
            }
          }
          .synopsis {
            width: 100%;
            height: auto;
            font-family: "Roboto 300";
            font-size: 1.2rem;
            color: white;
            /* background: red; */
            margin-top: 1rem;
          }
        }
      }

      .player-container {
        width: 85%;
        min-height: 35rem;
        height: auto;
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background: #161515; */
        .player {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      }
    }
  }
`;

const movieTemplate = {
  id: "",
  title: "",
  rating: 0,
  year: "",
  genre: "",
  time: "",
  actors: "",
  synopsis: "",
  link: "",
  imageXL: "",
  imageL: "",
  imageM: "",
  imageS: "",
};
const Movie = () => {
  // const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);

  const [state, setState] = useState(movieTemplate);
  const [spinner, setSpinner] = useState(false);
  const modifyLink = state.link?.split(".mp4")[0];
  // ! Scroll to TOP
  const movieRef = useRef();
  const scrollToTop = () => {
    movieRef.current.scrollTop = 0;
  };
  const handleModal = () => {
    dispatch(setModal("", false));
  };
  const fetchData = () => {
    setSpinner(true);

    axios
      .get(`${URI}/movies/${app.modal.id}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })

      .then(function (response) {
        setSpinner(false);
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
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.modal.id]);
  //!para validar query
  let genero = state.genre.slice(0, 4).toLowerCase();

  const cleanText = state.genre?.replace("|", ".");
  const cleanSynopsis = state.synopsis.replace("(FILMAFFINITY)", "");
  return (
    <MovieSt>
      <div className="gradient-movie" onClick={handleModal}></div>
      <div className="movie-container" ref={movieRef}>
        <div className="container-poster-data">
          <div className="container-poster">
            <img className="img-movie" src={state.imageM && `${BUCKET}${state.imageM}`} alt="" />
          </div>
          <div className="container-data">
            <h2 className="title-movie">{state.title}</h2>
            <h3 className="year-genre-time">
              {state.year} • {cleanText.split(" ")[0]} {cleanText.split(" ")[1]}{" "}
              {cleanText.split(" ")[2]} {cleanText.split(" ")[3]} • {state.time}
            </h3>
            <h3 className="rate">
              <span className="span">Calificación: </span> {state.rating}
              {/* <img className="span" src={star} alt="" /> {state.rating} */}
            </h3>
            <p className="actors">
              <span className="span">Actores:</span> {state.actors}
            </p>
            <p className="synopsis">{cleanSynopsis}</p>
          </div>
        </div>
        <div className="player-container">
          <ReactJWPlayer
            className="player"
            playerId="jw-player"
            playerScript="https://content.jwplatform.com/libraries/KB5zFt7A.js"
            // playlist={playlist}
            file={`${modifyLink}.mp4`}
            onBeforePlay={() => console.log("onBeforePlay fired!")}
            // image={state.image}
            type="mp4"
            preload="metadata"
            customProps={{
              // playbackRateControls: [1, 1.25, 1.5],
              autostart: false,
              cast: {},
            }}
          />
        </div>
        <Cluster genre={genero} subtitle="Relacionados" text="" />
      </div>
      {spinner === true && (
        <div className="loader">
          <Spinner05 />
        </div>
      )}

      <CloseIcon className="sysClose" onClick={handleModal} />
    </MovieSt>
  );
};

export default Movie;

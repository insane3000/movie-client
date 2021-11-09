import styled from "styled-components";
import ReactJWPlayer from "react-jw-player";
import Cluster from "../organisms/Cluster";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URI } from "config/axios";
import SpinnerImg from "../atoms/SpinnerImg";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginServer } from "redux/actions/appAction";
const MovieSt = styled.div`
  width: 100%;
  height: auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  .container-poster-data {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 02rem;
    .container-poster {
      width: 30rem;
      height: 42em;
      .img-movie {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .container-data {
      width: 90%;
      height: auto;
      padding: 0rem 0rem;
      .title-movie {
        font-family: "Roboto 900";
        font-size: 5rem;
        line-height: 5rem;
        margin-bottom: 0rem;
        text-align: center;
      }
      .year {
        font-family: "Roboto 100";
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        text-align: center;
      }

      .rate {
        font-family: "Roboto 900";
        font-size: 2rem;
        margin-bottom: 0.5rem;
        text-align: center;
        span {
          color: #ff0062;
          font-family: "Roboto 900";
          font-size: 2rem;
        }
      }
      .actors {
        font-family: "Roboto 900";
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        span {
          color: #ff0062;
          font-family: "Roboto 900";
          font-size: 1.5rem;
        }
      }
      .synopsis {
        font-family: "Roboto 300";
        font-size: 1.5rem;
      }
    }
  }

  .player {
    width: 90%;
    height: auto;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }
  color: white;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    .container-poster-data {
      width: 75%;
      height: 32rem;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      .container-poster {
        width: 20rem;
        height: 32em;
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
        width: calc(100% - 20rem);
        height: 100%;
        padding: 1rem 2rem;

        .title-movie {
          font-family: "Roboto 900";
          font-size: 4rem;
          margin-bottom: 0.5rem;
          text-align: left;
        }
        .year {
          font-family: "Roboto 100";
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          text-align: left;
        }

        .rate {
          font-family: "Roboto 900";
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          text-align: left;
          span {
            color: #ff0062;
            font-family: "Roboto 900";
            font-size: 1.5rem;
          }
        }
        .actors {
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          font-family: "Roboto 900";
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          // Dots ...
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #ff0062;
            font-family: "Roboto 900";
            font-size: 1.5rem;
          }
        }
        .synopsis {
          font-family: "Roboto 300";
          font-size: 1.3rem;
        }
      }
    }

    .player-container {
      width: 70%;
      min-height: 38rem;
      height: auto;
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      /* background: red; */
      .player {
        width: 100%;
        height: 100%;
        margin: 0;
      }
    }
  }
`;

// interface Params {
//   id: string;
//   // pais: string;
// }
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
  image: "",
};
const Movie = () => {
  const params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store) => store.app);

  const [state, setState] = useState(movieTemplate);
  const [imageLoad, setImageLoad] = useState(false);
  const modifyLink = state.link?.split(".mp4")[0];
  const handleLoadImg = (e) => {
    e.currentTarget.complete && setImageLoad(true);
  };
  // ! Scroll to TOP
  const movieRef = useRef();
  const scrollToTop = () => {
    movieRef.current.scrollTop = 0;
  };
  // const refreshPage = () => {
  //   window.location.reload();
  // };
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${URI}/movies/${params.id}`, {
          headers: {
            authorization: `Bearer ${app.login.token}`,
          },
        })

        .then(function (response) {
          setState(response.data);
          scrollToTop();
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
    fetchData();
    // console.log('alalalal')
  }, [params.id, app.login.token, dispatch, navigate]);
  //!para validar query
  let genero = state.genre.slice(0, 4).toLowerCase();

  const cleanText = state.genre?.replace("|", ".");
  return (
    <MovieSt ref={movieRef}>
      <div className="container-poster-data">
        <div className="container-poster">
          <img className="img-movie" src={state.image} alt="poster movie" onLoad={(e) => handleLoadImg(e)} />
          {!imageLoad && <SpinnerImg />}
        </div>
        <div className="container-data">
          <h2 className="title-movie">{state.title}</h2>
          <h3 className="year">
            {state.year} • {cleanText.split(" ")[0]} {cleanText.split(" ")[1]} {cleanText.split(" ")[2]}{" "}
            {cleanText.split(" ")[3]} • {state.time}
          </h3>
          <h3 className="rate">
            <span>Calificación:</span> {state.rating}
          </h3>
          <h3 className="actors">
            <span>Actores:</span> {state.actors}
          </h3>
          <span className="synopsis">{state.synopsis}</span>
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
          customProps={{
            // playbackRateControls: [1, 1.25, 1.5],
            autostart: false,
            cast: {},
          }}
        />
      </div>
      {genero === "" ? null : <Cluster genre={genero} subtitle="Ver mas" text="Ver todo." />}
    </MovieSt>
  );
};

export default Movie;

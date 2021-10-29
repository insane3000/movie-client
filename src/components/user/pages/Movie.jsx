import styled from "styled-components";
import ReactJWPlayer from "react-jw-player";
import movie01 from "img/posters/movie01.jpg";
const MovieSt = styled.div`
  width: 100%;
  height: 100%;
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
      width: 80rem;
      height: auto;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      .container-poster {
        width: 20rem;
        height: 32em;
        .img-movie {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .container-data {
        width: 60rem;
        height: 100%;
        padding: 1rem 2rem;

        .title-movie {
          font-family: "Roboto 900";
          font-size: 5rem;
          margin-bottom: 0.5rem;
        }
        .year {
          font-family: "Roboto 100";
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .rate {
          font-family: "Roboto regular";
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          span {
            color: #ff0062;
          }
        }
        .actors {
          font-family: "Roboto regular";
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          span {
            color: #ff0062;
          }
        }
        .synopsis {
          font-family: "Roboto 300";
          font-size: 1.3rem;
        }
      }
    }

    .player {
      width: 85.375rem;
      height: 48rem;
      margin-bottom: 2rem;
      margin-top: 2rem;
    }
  }
`;

const Movie = () => {
  return (
    <MovieSt>
      <div className="container-poster-data">
        <div className="container-poster">
          <img className="img-movie" src={movie01} alt="" />
        </div>
        <div className="container-data">
          <h2 className="title-movie">Dune</h2>
          <h3 className="year">2021 • Acción, Aventura, Drama • 2h 35m</h3>
          <h3 className="rate">
            <span>Calificación:</span> 7.2
          </h3>
          <h3 className="actors">
            <span>Actores:</span> Babs Olusanmokun, Balázs Megyeri, Benjamin
            Clémentine, Björn Freiberg,
          </h3>
          <span className="synopsis">
            El hijo de una familia noble trata de vengarse de la muerte de su
            padre al mismo tiempo que salva un planeta rico en especias que se
            le encomienda proteger. Nueva adaptación al cine de las novelas de
            Frank Herbert, que ya fueron trasladadas a la gran pantalla por
            David Lynch en 1984.
          </span>
        </div>
      </div>

      <ReactJWPlayer
        className="player"
        playerId="jw-player"
        playerScript="https://cdn.jwplayer.com/libraries/KLYWXiec.js"
        // playlist={playlist}
        file="https://www.mediafire.com/file/k9ekfwvvj11y8jd/Muerte_instant%25C3%25A1nea.mp4"
        onBeforePlay={() => console.log("onBeforePlay fired!")}
      />
    </MovieSt>
  );
};

export default Movie;

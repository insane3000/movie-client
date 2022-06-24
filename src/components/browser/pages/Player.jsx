import styled from "styled-components";
import ReactJWPlayer from "react-jw-player";

const PlayerSt = styled.div`
  width: 90%;
  min-height: 10rem;
  height: fit-content;
  margin: auto;
  background: black;
  .player {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 80%;
    min-height: 30rem;
    height: fit-content;
    margin: auto;
    margin-bottom: 2rem;
    background: black;
    .player {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
`;

const Movie = (props) => {
  return (
    <PlayerSt>
      <ReactJWPlayer
        className="player"
        playerId="my-unique-id"
        // playerScript="https://api.moviestorecbba.com/static/KB5zFt7A.js"
        // playerScript="https://cdn.jwplayer.com/libraries/OdX1sCZx.js"
        playerScript="//content.jwplatform.com/libraries/KB5zFt7A.js"
        file={props.link}
        type="mp4"
        customProps={{
          autostart: false,
          cast: {},
        }}
      />
    </PlayerSt>
  );
};

export default Movie;

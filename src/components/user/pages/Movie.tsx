import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useParams } from "react-router-dom";
const MovieSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "Roboto 900";
    font-size: 4rem;
    padding: 1rem 0;
    overflow-y: scroll;
    .video-container {
      width: 85.375rem;
      height: 48rem;
      /* background: red; */
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
interface Params {
  id: string;
}
const Movie = () => {
  const params = useParams<Params>();
  console.log(params);
  return (
    <MovieSt>
      <h2>Movie</h2>
      <div className="video-container">
        <ReactPlayer
          url={[
            {
              src: "https://www.mediafire.com/file/4ie1r5yp8dwpyjx/S01_E6_%25C2%25BFQu%25C3%25A9_pasar%25C3%25ADa_si...-_Temporada_1_%25282021%2529.mp4/file",
              type: "video/mp4",
            },
          ]}
          controls={true}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
                onContextMenu: (e: any) => e.preventDefault(), //<- this is the important bit
              },
            },
          }}
          width="100%"
          height="100%"
        />
      </div>
    </MovieSt>
  );
};

export default Movie;

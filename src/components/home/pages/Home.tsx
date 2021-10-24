import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
const HomeSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  background: #1a1919;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    font-family: "Roboto 900";
    font-size: 4rem;
    padding: 1rem 0;
    overflow-y: scroll;
  }
`;
const Home = () => {
  return (
    <HomeSt>
      <ReactPlayer
        url={[
          {
            src: "https://www.mediafire.com/file/x72tc0zxugu7eym/S01_E1_%25C2%25BFQu%25C3%25A9_pasar%25C3%25ADa_si...-_Temporada_1_%25282021%2529.mp4/file",
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
      />
      <ReactPlayer
        url={[
          {
            src: "https://www.mediafire.com/file/qeii1i558rusys6/S01_E3_%25C2%25BFQu%25C3%25A9_pasar%25C3%25ADa_si...-_Temporada_1_%25282021%2529.mp4/file",
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
      />
      <ReactPlayer
        url={[
          {
            src: "https://www.mediafire.com/file/q3j71dui09tabwj/S01_E4_%25C2%25BFQu%25C3%25A9_pasar%25C3%25ADa_si...-_Temporada_1_%25282021%2529.mp4/file",
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
      />
      <ReactPlayer
        url={[
          {
            src: "https://www.mediafire.com/file/gy0ajsxbc1x96py/S01_E9_%25C2%25BFQu%25C3%25A9_pasar%25C3%25ADa_si...-_Temporada_1_%25282021%2529.mp4/file",
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
      />
    </HomeSt>
  );
};

export default Home;

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
    justify-content: center;
    align-items: center;
    font-family: "Roboto 900";
    font-size: 4rem;
  }
`;
const Home = () => {
  return (
    <HomeSt>
      <ReactPlayer
        url="https://www.mediafire.com/file/725l2aamowyv925/Jungle_Cruise.mp4/file"
        controls={true}
      />
    </HomeSt>
  );
};

export default Home;

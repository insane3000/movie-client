import React from "react";
import styled from "styled-components";
// import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import Pattern from "img/pattern.png";
const HomeSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto 900";
  font-size: 4rem;
  padding: 1rem 0;
  overflow-y: scroll;
  /* background-color: transparent; */
  background-image: url(${Pattern});
  background-size: 4.6875rem;
  background-repeat: repeat;
  background-attachment: fixed;
  .resellerBtn {
    width: 10rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    text-decoration: none;
    font-family: "Roboto 900";
    font-size: 2rem;
    color: white;
    background: #5900ff;
    border-radius: 0.3rem;
  }
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
    /* background-color: transparent; */
    background-image: url(${Pattern});
    background-size: 4.6875rem;
    background-repeat: repeat;
    background-attachment: fixed;
    .resellerBtn {
      width: 10rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      text-decoration: none;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: white;
      background: #5900ff;
      border-radius: 0.3rem;
    }
  }
`;
const Home = () => {
  return (
    <HomeSt>
      <h1>HOME</h1>
      <Link className="resellerBtn" to="/reseller/home">
        Reseller
      </Link>
    </HomeSt>
  );
};

export default Home;

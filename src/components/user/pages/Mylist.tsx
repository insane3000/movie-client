import React from "react";
import styled from "styled-components";
const AllMoviesSt = styled.div`
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
  }
`;
const AllMovies = () => {
  return <AllMoviesSt>My list</AllMoviesSt>;
};

export default AllMovies;
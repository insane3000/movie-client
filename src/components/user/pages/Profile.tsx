import React from "react";
import styled from "styled-components";

const SearchSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Roboto 900";
    font-size: 8rem;
  }
`;
const Search = () => {
  return <SearchSt>Profile</SearchSt>;
};

export default Search;

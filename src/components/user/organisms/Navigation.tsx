import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// *Icons
import UserIconLight from "icons/UserIconLight";
import SearchIcon from "icons/SearchIcon";
const NavigationSt = styled.nav`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 5rem;
    /* background: #070707; */
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 4rem;
    /* border-bottom: 0.0625rem solid #111010; */

    .title {
      font-family: "Roboto 900";
      font-size: 3rem;
      text-decoration: none;
      color: #ffffff;
    }
    .ul {
      display: grid;
      grid-template-columns: repeat(5, auto);
      grid-template-rows: 3rem;
      gap: 1rem;
      margin-left: 3rem;
      .li {
        justify-self: center;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background: red; */
        font-family: "Roboto 300";
        font-size: 1rem;
        text-decoration: none;
        color: #ffffff;
        /* background: #2b283b; */
        border-radius: 0.3rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
        /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
        /* &:hover {
          color: white;
        } */
      }
    }
    .buttons-right {
      position: absolute;
      right: 1rem;
      width: 7rem;
      height: 3rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .search {
        width: 2rem;
        height: 2rem;
        transform: scaleX(-1);
        cursor: pointer;
      }
      .user {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }
    }
  }
`;
const Navigation = () => {
  return (
    <NavigationSt>
      <Link className="title" to="/">
        PLEX
      </Link>
      <section className="ul">
        <Link className="li" to="/reseller">
          Home
        </Link>
        <Link className="li" to="/reseller/series/all-series">
          Series
        </Link>
        <Link className="li" to="/reseller/movies/all-movies">
          Películas
        </Link>
        <Link className="li" to="/reseller/premieres">
          Estrenos
        </Link>
        {/* <Link className="li" to="/reseller/mylist">
          Mi lista
        </Link> */}
      </section>
      <div className="buttons-right">
        <SearchIcon className="search" />
        <UserIconLight className="user" />
      </div>
    </NavigationSt>
  );
};

export default Navigation;

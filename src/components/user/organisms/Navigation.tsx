import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
// *Icons
import UserIconLight from "icons/UserIconLight";
import SearchIcon from "icons/SearchIcon";
import CloseIcon from "icons/CloseIcon";
import { useDispatch } from "react-redux";
import { search } from "redux/actions/appAction";
import axios from "axios";
const NavigationSt = styled.nav`
  width: 100%;
  height: 5rem;
  /* background: #070707; */
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 1rem;
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
      font-size: 2rem;
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
      .active {
        background: #ff0055;
      }
    }
    .search-container {
      position: absolute;
      right: 7rem;
      width: 20rem;
      height: 2.5rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      /* background: red; */
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      border-radius: 0.3rem;
      overflow: hidden;
      background: #f6f6f6;
      .search-input {
        height: 100%;
        width: calc(100% - 3rem);
        padding: 0 1rem;
        font-family: "Roboto regular";
        color: black;
        font-size: 1rem;
        outline: none;
        border-style: none;
        background: none;
        background: #f6f6f6;
      }
      .btn-submit {
        width: 3rem;
        height: 100%;
        cursor: pointer;
        border-style: none;
        background: #f6f6f6;

        .icon-submit {
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          background: none;
          transition: 0.1s;
          color: #333333;
          background: #f6f6f6;
          &:hover {
            transform: scale(1.1);
            transition: 0.1s;
            color: #000000;
          }
        }
      }
    }

    .buttons-right {
      position: absolute;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      /* .search {
        width: 3rem;
        height: 3rem;
        display: none;
        transform: scaleX(-1);
        cursor: pointer;
        padding: 0.5rem 0.5rem;
        border-radius: 100%;

        &:hover {
          background: white;
          color: black;
          transition: 0.1s;
        }
      } */
      .user {
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        transition: 0.1s;
        border-radius: 100%;
        padding: 0.5rem 0.5rem;
        transition: 0.1s;
        background: #ff0055;
        color: #ffffff;
        &:hover {
          transform: scale(1.1);
          transition: 0.1s;
        }
      }
      .options {
        width: 10rem;
        /* min-height: 10rem; */
        height: auto;
        background: #030013;
        position: absolute;
        top: 4rem;
        right: 0;
        z-index: 1;
        border-radius: 0.3rem;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        display: flex;
        transition: 0.1s;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        padding: 0.5rem 0.5rem;
        .close-user {
          background: #ffffff;
          color: black;
          position: absolute;
          right: -1rem;
          top: -1rem;
          border-radius: 100%;
          width: 2rem;
          height: 2rem;
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
        .link {
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          font-family: "Roboto regular";
          font-size: 1rem;
          text-decoration: none;
          padding: 0 0.5rem;
          color: #d8d8d8;
          border-radius: 0.3rem;
          &:hover {
            background: #19142e;
            color: #ffffff;
          }
        }
        .active {
          background: #ff0055;
        }
      }
    }
  }
`;
const Navigation = () => {
  let history = useHistory();
  const dispacth = useDispatch();
  const [state, setState] = useState("");
  const [user, setUser] = useState(false);

  const handleShowUser = () => {
    setUser(!user);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value.trim());
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    history.push("/search");
  };
  const fetchData = () => {
    axios
      .get(`http://192.168.0.148:5000/movie-search/${state}`)
      .then(function (response: any) {
        dispacth(search(response.data));
      })
      .catch(function (error) {
        console.log(error);
        // history.push(`/admin/login`);
      });
  };

  return (
    <NavigationSt>
      <Link className="title" to="/">
        Movie Store Cbba
      </Link>
      <section className="ul">
        <NavLink className="li" to="/home">
          Home
        </NavLink>

        <NavLink className="li" to="/movies">
          Películas
        </NavLink>
        <NavLink className="li" to="/premieres">
          Estrenos
        </NavLink>
        <NavLink className="li" to="/category">
          Categorias
        </NavLink>
        {/* <NavLink className="li" to="/series">
          Series
        </NavLink> */}
      </section>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="Buscar..."
          onChange={(e) => handleSearch(e)}
        />
        <button className="btn-submit" type="submit">
          <SearchIcon className="icon-submit" />
        </button>
      </form>
      <div className="buttons-right">
        {/* <SearchIcon className="search" onClick={(e) => searchBtn(e)} /> */}
        <UserIconLight className="user" onClick={handleShowUser} />
        {user && (
          <section className="options">
            <CloseIcon className="close-user" onClick={handleShowUser} />
            <NavLink className="link" to="/profile" onClick={handleShowUser}>
              Perfil
            </NavLink>
            <NavLink className="link" to="/clients" onClick={handleShowUser}>
              Clientes
            </NavLink>
            <NavLink className="link" to="/media" onClick={handleShowUser}>
              Contenido
            </NavLink>
            <NavLink className="link" to="/login" onClick={handleShowUser}>
              Salir
            </NavLink>
          </section>
        )}
      </div>
    </NavigationSt>
  );
};

export default Navigation;

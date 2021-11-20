import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// *Icons
import UserIconLight from "icons/LoginIcon";
import SearchIcon from "icons/SearchIcon";
import CloseIcon from "icons/CloseIcon";
import { useDispatch, useSelector } from "react-redux";
import { loginServer, restartScroll, search } from "redux/actions/appAction";
import axios from "axios";
import { URI } from "config/axios";
import { StoreInterface } from "interfaces/storeTemplate";

const NavigationSt = styled.nav`
  /* background: #00000013; */
  /* background: linear-gradient(90deg, #0808086a 0%, #12121352 100%); */
  /* border-bottom: 0.0625rem solid #111010; */

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 5rem;
    background: #070707;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
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
        background: #ffffff;
        color: black;
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
      background: #1f1d1d;
      .search-input {
        height: 100%;
        width: calc(100% - 3rem);
        padding: 0 1rem;
        font-family: "Roboto 300";
        color: black;
        font-size: 1rem;
        outline: none;
        border-style: none;
        background: none;
        background: none;
        color: white;
      }
      .btn-submit {
        width: 3rem;
        height: 100%;
        cursor: pointer;
        border-style: none;
        /* background: red; */
        background: none;
        .icon-submit {
          width: 100%;
          height: 100%;
          padding: 0.5rem;
          background: none;
          transition: 0.1s;
          color: #ffffff;
          background: none;
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
        /* background: #5901e7; */
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
        background: #0d0d0e;
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
        border: 0.0625rem solid #252525;
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
            background: #1a1919;
            color: #ffffff;
          }
        }
        .active {
          background: #ffffff;
          color: black;
        }
      }
    }
  }
`;
const Navigation = () => {
  // const navigationRef = useRef<any>();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const [state, setState] = useState("");
  const [user, setUser] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value.trim());
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
    navigate("/browser/search");
    dispatch(restartScroll("search", 0));
  };
  const fetchData = () => {
    axios
      .get(`${URI}/movie-search/${state}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        dispatch(search(response.data));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loginServer("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("user", "");
        localStorage.setItem("role", "");
        // navigate(`/browser/home`);
      });
  };
  const logout = () => {
    dispatch(loginServer("", "", ""));
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    localStorage.setItem("role", "");
    navigate(`/home`);
    setUser(!user);
  };
  // console.log(navigationRef);
  return (
    <NavigationSt
    // ref={navigationRef}
    // style={navigationRef.current.scrollTop !== 0 ? { background: "red" } : { background: "lime" }}
    >
      <Link className="title" to="/browser/home" onClick={() => dispatch(restartScroll("home", 0))}>
        Movie Store Cbba
      </Link>
      {app.login.token === "" ? null : (
        <section className="ul">
          <NavLink
            className="li"
            to="/browser/home"
            onClick={() => dispatch(restartScroll("home", 0))}
          >
            Inicio
          </NavLink>
          {/* <NavLink
            className="li"
            to="/browser/movies"
            onClick={() => dispatch(restartScroll("movies", 0))}
          >
            Películas
          </NavLink> */}
          <NavLink
            className="li"
            to="/browser/premieres"
            onClick={() => dispatch(restartScroll("premieres", 0))}
          >
            Estrenos
          </NavLink>
          <NavLink className="li" to="/browser/category">
            Géneros
          </NavLink>
        </section>
      )}
      {app.login.token === "" ? null : (
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
      )}

      <div className="buttons-right">
        {/* <SearchIcon className="search" onClick={(e) => searchBtn(e)} /> */}
        <UserIconLight className="user" onClick={() => setUser(!user)} />
        {user && (
          <section className="options">
            <CloseIcon className="close-user" onClick={() => setUser(!user)} />
            {app.login.role !== "admin" && (
              <NavLink className="link" to="/browser/profile" onClick={() => setUser(!user)}>
                Perfil
              </NavLink>
            )}
            {/* {app.login.role === "admin" && (
              <NavLink className="link" to="/browser/clients" onClick={() => setUser(!user)}>
                Clientes
              </NavLink>
            )} */}
            {app.login.role === "admin" && (
              <NavLink className="link" to="/admin/media" onClick={() => setUser(!user)}>
                Administrar
              </NavLink>
            )}
            {app.login.token === "" ? (
              <NavLink className="link" to="/admin/login" onClick={() => setUser(!user)}>
                Login
              </NavLink>
            ) : (
              <NavLink className="link" to="/browser" onClick={logout}>
                Salir
              </NavLink>
            )}
          </section>
        )}
      </div>
    </NavigationSt>
  );
};

export default Navigation;

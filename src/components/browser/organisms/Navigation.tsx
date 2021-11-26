import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// *Icons
import SearchIcon from "icons/SearchIcon";
import ExitIcon from "icons/ExitIcon";
import { useDispatch, useSelector } from "react-redux";
import { loginServer, restartScroll, search } from "redux/actions/appAction";
import axios from "axios";
import { URI } from "config/axios";
import { StoreInterface } from "interfaces/storeTemplate";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

const NavigationSt = styled.nav`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 5rem;
    background: rgb(255, 0, 0);
    background: linear-gradient(0deg, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 4rem;

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
        font-family: "Roboto 300";
        font-size: 1rem;
        text-decoration: none;
        color: #ffffff;
        border-radius: 0.3rem;
        width: 100%;
        height: 2rem;
        padding: 0 0.5rem;
      }
      .active {
        color: #ffffff;
        font-family: "Roboto 900";
      }
    }

    .exit {
      position: absolute;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      border-radius: 0.3rem;
      .sysIconExit {
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        transition: 0.1s;
        padding: 0.5rem 0.5rem;
        transition: 0.1s;
        color: #ffffff;
        &:hover {
          transform: scale(1.1);
          transition: 0.1s;
        }
      }
    }
  }
`;
const SearchSt = styled.form`
  position: absolute;
  right: 7rem;
  width: 20rem;
  height: 2.5rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 0.3rem;
  background: #1f1d1d;
  background: #ebebeb;

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
    color: #000000;
    border-radius: 0.3rem;
  }
  .btn-submit {
    width: 3rem;
    height: 100%;
    cursor: pointer;
    border-style: none;
    background: none;

    .icon-submit {
      width: 100%;
      height: 100%;
      padding: 0.5rem;
      background: none;
      transition: 0.1s;
      color: #161616;
      background: none;
      &:hover {
        transform: scale(1.1);
        transition: 0.1s;
        color: #000000;
      }
    }
  }
`;
const Navigation = (props: any) => {
  const searchRef = useRef<any>();
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);
  const [state, setState] = useState("");
  //   console.log(state);
  const notify = () => toast.error("El buscador esta vacio!");
  const timerRef = useRef<any>(null);

  // !Handle change con busqueda automarica cada .5seg
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    clearTimeout(timerRef.current);
    if (value.length >= 1) {
      navigate("/browser/search");
      timerRef.current = setTimeout(() => fetchData(value), 500);
    }
//     if (value.length === 0) {
//       navigate("/");
//       searchRef.current.focus();
//       console.log(searchRef);
//     }
    setState(e.target.value);
  };

  useEffect(() => {
    console.log("mostrabndo use effect");
  }, []);
  // ! handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //     const value = e.currentTarget.value;
    if (state.trim() === "") notify();
    if (state.trim() !== "") {
      fetchData(state);
      navigate("/browser/search");
    }
  };
  const fetchData = async (value: string) => {
    await axios
      .get(`${URI}/movie-search?title=${value}`, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.user}`,
          role: `${app.login.role}`,
        },
      })
      .then(function (response: any) {
        dispatch(search(response.data.docs));
        console.log(response);
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
    localStorage.setItem("fails", "0");
    //     navigate(`/`);
    //     setUser(!user);
  };

  return (
    <NavigationSt style={{ background: props.bg }}>
      <Link className="title" to="/browser/home" onClick={() => dispatch(restartScroll("home", 0))}>
        Movie Store Cbba
      </Link>

      <section className="ul">
        <NavLink
          className="li"
          to="/browser/home"
          onClick={() => dispatch(restartScroll("home", 0))}
        >
          Inicio
        </NavLink>

        <NavLink
          className="li"
          to="/browser/premieres"
          onClick={() => dispatch(restartScroll("premieres", 0))}
        >
          Estrenos
        </NavLink>
        <NavLink className="li" to="/browser/category">
          Categorías
        </NavLink>
        <NavLink className="li" to="/browser/profile">
          Perfil
        </NavLink>
      </section>

      <SearchSt onSubmit={handleSubmit}>
        <input
          ref={searchRef}
          className="search-input"
          type="text"
          name="search"
          placeholder="Buscar..."
          onChange={(e) => handleSearch(e)}
          //   minLength={2}
        />
        <button className="btn-submit" type="submit">
          <SearchIcon className="icon-submit" />
        </button>
      </SearchSt>

      <NavLink className="exit" to="/" onClick={logout} title="salir">
        <ExitIcon className="sysIconExit" />
      </NavLink>
    </NavigationSt>
  );
};

export default Navigation;

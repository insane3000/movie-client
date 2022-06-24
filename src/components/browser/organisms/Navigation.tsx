import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// *Icons
import SearchIcon from "icons/SearchIcon";
import ExitIcon from "icons/ExitIcon";
import { useDispatch } from "react-redux";
import { loginServer, search } from "redux/actions/appAction";
import toast from "react-hot-toast";
const NavigationSt = styled.nav`
  display: none;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 5rem;
    /* background: rgb(255, 0, 0);
    background: linear-gradient(0deg, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%); */
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
      grid-template-columns: repeat(6, auto);
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
      /* .active {
        color: #ffffff;
        font-family: "Roboto 900";
      } */
    }
    .showSearchBtn {
      position: absolute;
      right: 7.2rem;
      width: 2.5rem;
      height: 2.5rem;
      cursor: pointer;
      border-style: none;
      background: none;

      .icon-submit {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        background: none;
        transition: 0.1s;
        color: #ffffff;
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
  display: none;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    position: absolute;
    right: 7rem;
    width: 20rem;
    height: 2.5rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 1rem;
    background: #1f1d1d;
    background: #000000cc;

    .search-input {
      height: 100%;
      width: calc(100% - 3rem);
      padding: 0 1rem;
      font-family: "Roboto 300";
      /* color: black; */
      font-size: 1rem;
      outline: none;
      border-style: none;
      background: none;
      background: none;
      color: #ffffff;
      border-radius: 1rem;
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
        color: #6e6e6e;
        background: none;
        /* &:hover {
          transition: 0.1s;
          color: #000000;
        } */
      }
    }
    animation-name: example;
    animation-duration: 0.1s;
    @keyframes example {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;
const Navigation = (props: any) => {
  const searchRef = useRef<any>();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const notify = () => toast.error("El buscador esta vacio!");
  const timerRef = useRef<any>(null);

  // !Handle change con busqueda automarica cada .5seg
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim().replace(/[^a-zA-Z 0-9.]+/g, "");
    clearTimeout(timerRef.current);
    if (value.length >= 2) {
      timerRef.current = setTimeout(() => {
        navigate(`/browser/search?query=${value}`);
        dispatch(search(value));
      }, 500);
    }
    setState(value);
  };
  // ! handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.trim() === "") return notify();
    navigate(`/browser/search?query=${state}`);
  };

  const logout = () => {
    dispatch(loginServer("", "", "", ""));
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    localStorage.setItem("role", "");
    localStorage.setItem("name", "");
    localStorage.setItem("fails", "0");
    navigate(`/`);
    //     socket.emit("closeUserID", app.login.user); //TODO falta hacer esta parte
  };

  //   const [showSearch, setShowSearch] = useState(false);
  //! CLICK OUTSIDE SEARCH
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef<any>(null);
  useEffect(() => {
    const handler = (e: any) => {
      if (!searchContainerRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <NavigationSt style={{ background: props.bg }}>
      <Link
        className="title"
        to="/browser/home"
        // style={showSearch ? { display: "none" } : { display: "flex" }}
      >
        Movie Store Cbba
      </Link>

      <section className="ul">
        <NavLink className="li" to="/browser/home">
          Inicio
        </NavLink>

        <NavLink className="li" to="/browser/premieres?page=1">
          Estrenos
        </NavLink>

        <NavLink className="li" to="/browser/genre/series-tv?page=1">
          Series TV
        </NavLink>

        <NavLink className="li" to="/browser/category">
          Categorías
        </NavLink>
        <NavLink className="li" to="/browser/profile">
          Perfil
        </NavLink>
        <NavLink className="li" to="/browser/plans">
          Planes
        </NavLink>
      </section>

      <button
        className="showSearchBtn"
        type="submit"
        onClick={() => setIsOpen(true)}
        style={isOpen ? { display: "none" } : { display: "flex" }}
      >
        <SearchIcon className="icon-submit" />
      </button>

      {isOpen && (
        <SearchSt onSubmit={handleSubmit} ref={searchContainerRef}>
          <input
            ref={searchRef}
            className="search-input"
            type="text"
            name="search"
            placeholder="Buscar..."
            onChange={(e) => handleChangeSearch(e)}
            //     minLength={1}
            autoFocus
            onFocus={(e) => e.target.select()}
          />
          <button className="btn-submit" type="submit">
            <SearchIcon className="icon-submit" />
          </button>
        </SearchSt>
      )}

      <span className="exit" onClick={logout} title="salir">
        <ExitIcon className="sysIconExit" />
      </span>
    </NavigationSt>
  );
};

export default Navigation;

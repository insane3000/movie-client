import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// *Icons
import SearchIcon from "icons/SearchIcon";
import MenuIcon from "icons/MenuIcon";
import { useDispatch } from "react-redux";
import { loginServer, restartScroll, search, showMenu } from "redux/actions/appAction";
import toast from "react-hot-toast";

const NavigationSt = styled.nav`
  width: 100%;
  height: 3.125rem;
  /* background: rgb(255, 0, 0);
  background: linear-gradient(0deg, rgba(255, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%); */
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: start;
  align-items: center;
  /* padding: 0 4rem; */
  /* background: #0c0c0c; */
  .hamburgerBtn {
    width: 2rem;
    height: 2rem;
    /* background: red; */
    margin-left: 1rem;
    border-style: none;
    outline: none;
    background: none;
    .sysIconMenu {
      font-size: 2rem;
      color: white;
    }
  }
  .title {
    /* position: absolute; */
    margin-left: 0.5rem;
    font-family: "Roboto 700";
    font-size: 1.2rem;
    text-decoration: none;
    color: #ffffff;
    /* background: lime; */
  }

  .showSearchBtn {
    position: absolute;
    right: 1rem;
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

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: none;
  }
`;
const SearchSt = styled.form`
  position: absolute;
  right: 0.8rem;
  width: 18rem;
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
        /* transform: scale(1.1); */
        transition: 0.1s;
        color: #000000;
      }
    }
  }
  animation-name: example;
  animation-duration: 0.3s;
  @keyframes example {
    from {
      width: 2.5rem;
    }
    to {
      width: 18rem;
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
    const value = e.currentTarget.value.trim();
    //     console.log(value.length);
    clearTimeout(timerRef.current);
    if (value.length >= 1) {
      navigate("/browser/search");
      //       timerRef.current = setTimeout(() => fetchData(value), 500);
      dispatch(search(value));
    }
    setState(value);
  };
  // ! handle Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.trim() === "") return notify();
    navigate("/browser/search");
  };

  const logout = () => {
    dispatch(loginServer("", "", ""));
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    localStorage.setItem("role", "");
    localStorage.setItem("fails", "0");
    navigate(`/`);
  };

  const [showSearch, setShowSearch] = useState(false);
  // !Test Icons Search***************************************
  let ref = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    setShowSearch(true);
    if (ref.current && !ref.current.contains(event.target)) {
      props.onClickOutside && props.onClickOutside();
      console.log("click");
      setShowSearch(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
  // !Open Menu
  const closeMenu = () => {
    dispatch(showMenu(true));
  };
  return (
    <NavigationSt style={{ background: props.bg }}>
      <button className="hamburgerBtn" onClick={closeMenu}>
        <MenuIcon className="sysIconMenu" />
      </button>
      {!showSearch && (
        <Link
          className="title"
          to="/browser/home"
          onClick={() => dispatch(restartScroll("home", 0))}
        >
          Movie Store Cbba
        </Link>
      )}

      <button
        className="showSearchBtn"
        type="submit"
        onClick={() => setShowSearch(true)}
        style={showSearch ? { display: "none" } : { display: "flex" }}
      >
        <SearchIcon className="icon-submit" />
      </button>

      {showSearch && (
        <SearchSt onSubmit={handleSubmit} ref={ref}>
          <input
            ref={searchRef}
            className="search-input"
            type="text"
            name="search"
            placeholder="Buscar..."
            onChange={(e) => handleChangeSearch(e)}
          />
          <button className="btn-submit" type="submit">
            <SearchIcon className="icon-submit" />
          </button>
        </SearchSt>
      )}

      {/* <span className="exit" onClick={logout} title="salir">
        <ExitIcon className="sysIconExit" />
      </span> */}
    </NavigationSt>
  );
};

export default Navigation;

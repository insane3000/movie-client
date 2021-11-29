import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
// *Fonts
import "fonts/fonts.css";
// *Components
import Home from "components/browser/pages/Home";
import Premieres from "components/browser/pages/Premieres";
import styled from "styled-components";
import Movie from "components/browser/pages/Movie";
import Search from "components/browser/pages/Search";
import Profile from "components/browser/pages/Profile";
import Error404 from "../Error404";
import Categories from "./pages/Categories";
// import Welcome from "./pages/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { setModal, showMenu } from "redux/actions/appAction";
import Navigation from "./organisms/Navigation";
import NavigationMobile from "./organisms/NavigationMobile";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
const BrowserSt = styled.div`
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    position: relative;
  }
`;
const ModalSt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #05010e55;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const MenuSt = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #000000cf;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  color: white;
  .gradient {
    width: 100%;
    height: 100%;
  }
  .menuDetails {
    width: 80%;
    height: 100%;
    background: #0e0d0d;
    position: absolute;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .ul {
      width: 80%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .li {
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        padding: 0 1rem;
        margin-bottom: 0.5rem;
        text-decoration: none;
        font-family: "Roboto 100";
        font-size: .8rem;
        color: #c0c0c0;
        background: black;
        border-radius: .3rem;
      }
    }
  }
`;
const User = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  useEffect(() => {
    window.addEventListener("popstate", () => dispatch(setModal("", false)));
    return () => {
      window.removeEventListener("popstate", dispatch);
    };
  }, [dispatch]);
  // !The scroll listener
  const refScroll = useRef<any>();

  const [bg, setBg] = useState("");
  const handleScroll = useCallback((e) => {
    //     console.log(e.target.scrollTop);
    e.target.scrollTop > 0 ? setBg("#0e0d0d") : setBg("");
  }, []);
  // ! Scroll to TOP
  const scrollToTop = () => {
    refScroll.current.scrollTop = 0;
  };
  // !Attach the scroll listener to the div
  useEffect(() => {
    const div = refScroll.current;
    div.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTopCallback = useCallback(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    scrollToTopCallback();
  }, [pathname, scrollToTopCallback]);

  // !Close Menu
  const closeMenu = () => {
    dispatch(showMenu(false));
  };
  return (
    <BrowserSt id="app" ref={refScroll}>
      <Navigation bg={bg} />
      <NavigationMobile bg={bg} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/premieres" element={<Premieres />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/category/*" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      {app.modal.show && (
        <ModalSt>
          <Movie />
        </ModalSt>
      )}
      {app.showMenu && (
        <MenuSt>
          <div className="gradient" onClick={closeMenu}></div>
          <div className="menuDetails">
            <section className="ul">
              <NavLink className="li" to="/browser/home" onClick={closeMenu}>
                Inicio
              </NavLink>
              <NavLink className="li" to="/browser/premieres" onClick={closeMenu}>
                Estrenos
              </NavLink>
              <NavLink className="li" to="/browser/category" onClick={closeMenu}>
                Categorías
              </NavLink>
              <NavLink className="li" to="/browser/profile" onClick={closeMenu}>
                Perfil
              </NavLink>
            </section>
          </div>
        </MenuSt>
      )}
    </BrowserSt>
  );
};

export default User;

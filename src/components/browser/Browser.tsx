import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { setModal } from "redux/actions/appAction";
import Navigation from "./organisms/Navigation";
import { useLocation } from "react-router";
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
  return (
    <BrowserSt id="app" ref={refScroll}>
      <Navigation bg={bg} />
      <Routes>
        <Route path="/" element={<Navigate to="/browser/home" />} />
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
    </BrowserSt>
  );
};

export default User;

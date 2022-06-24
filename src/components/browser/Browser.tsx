import { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
// *Fonts
import "fonts/fonts.css";
// *Components
import Home from "components/browser/pages/Home";
import Premieres from "components/browser/pages/Premieres";
import styled from "styled-components";
import Search from "components/browser/pages/Search";
import Profile from "components/browser/pages/Profile";
import Error404 from "../Error404";
import Categories from "./pages/Categories";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { setModal, setModalReport, setModalSerie } from "redux/actions/appAction";
import Navigation from "./organisms/Navigation";
import NavigationMobile from "./organisms/NavigationMobile";
import { useLocation } from "react-router";
import MenuMobile from "./organisms/MenuMobile";
// *Socket.io
import socket from "config/Socket";
import axios from "axios";
import Plans from "./pages/Plans";
import Genre from "./pages/Genre";
import DevTools from "components/DevTools";
const BrowserSt = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
  }
`;

const User = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  useEffect(() => {
    // ! Screens control
    socket.emit("userID", app.login.user);
    socket.on("users", async (data) => {
      const screens = await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/client-screens/${app.login.user}`)
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      let userID = data.filter((i: any) => i.userID === app.login.user);
      if (userID.length > screens) {
        navigate("/user-connected-error");
      }
    });

    window.addEventListener("popstate", () => dispatch(setModal("", false)));
    window.addEventListener("popstate", () => dispatch(setModalSerie("", false)));
    window.addEventListener("popstate", () => dispatch(setModalReport(false, "", "", "", "", "")));
    return () => {
      window.removeEventListener("popstate", dispatch);
      //       window.removeEventListener("popstate", dispatch);
    };
  }, [dispatch, app.login.user, navigate]);
  // !The scroll listener
  const refScroll = useRef<any>();

  const [bg, setBg] = useState("");
  const handleScroll = useCallback((e) => {
    //     console.log(e.target.scrollTop);
    e.target.scrollTop > 0 ? setBg("#0e0e0ef6") : setBg("");
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
      <NavigationMobile bg={bg} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/premieres" element={<Premieres />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/genre/:genre" element={<Genre />} />
        <Route path="/devtools" element={<DevTools />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>

      {app.showMenu && <MenuMobile />}
    </BrowserSt>
  );
};

export default User;

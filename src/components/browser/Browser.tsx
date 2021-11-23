import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// *Fonts
import "fonts/fonts.css";
// *Components
import Home from "components/browser/pages/Home";
import Premieres from "components/browser/pages/Premieres";
import ListMoviesGenre from "components/browser/pages/Genre";
import styled from "styled-components";
import Movie from "components/browser/pages/Movie";
import Search from "components/browser/pages/Search";
import Profile from "components/browser/pages/Profile";
import Login from "components/admin/pages/Login";
import Error404 from "../Error404";
import Categories from "./pages/Categories";
import Welcome from "./pages/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer, setModal } from "redux/actions/appAction";
const BrowserSt = styled.div`
  width: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
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
`;
const User = () => {
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      dispatch(
        loginServer(
          `${localStorage.getItem("user")}`,
          `${localStorage.getItem("token")}`,
          `${localStorage.getItem("role")}`
        )
      );
    }
  }, [dispatch]);
  
  useEffect(() => {
    window.addEventListener("popstate", () => dispatch(setModal("", false)));
    return () => {
      window.removeEventListener("popstate", dispatch);
    };
  }, [dispatch]);
  return (
    <BrowserSt id="app">
      <Routes>
        <Route
          path="/"
          element={app.login.token === "" ? <Welcome /> : <Navigate to="/browser/home" />}
        />
        <Route path="/login" element={app.login.token === "" ? <Login /> : <Navigate to="/" />} />
        <Route path="/welcome" element={app.login.token === "" ? <Navigate to="/" /> : <Home />} />
        {app.login.token !== "" && <Route path="/home" element={<Home />} />}
        {app.login.token !== "" && <Route path="/premieres" element={<Premieres />} />}
        {app.login.token !== "" && <Route path="/movie/:id" element={<Movie />} />}
        {app.login.token !== "" && <Route path="/category/*" element={<Categories />} />}
        {/* {app.login.token !== "" && <Route path="/genre/:genre" element={<ListMoviesGenre />} />} */}
        {app.login.token !== "" && <Route path="/search" element={<Search />} />}
        {app.login.token !== "" && <Route path="/profile" element={<Profile />} />}
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

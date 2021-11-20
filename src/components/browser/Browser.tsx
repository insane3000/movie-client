import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// *Fonts
import "fonts/fonts.css";
// *Components
import Home from "components/browser/pages/Home";
import AllMovies from "components/browser/pages/Movies";
import Premieres from "components/browser/pages/Premieres";
import ListMoviesGenre from "components/browser/pages/Genre";
import Navigation from "components/browser/organisms/Navigation";
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
import { loginServer } from "redux/actions/appAction";

const UserSt = styled.div`
  width: 100%;
  /* height: 100%; */

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: auto;
    background: #0a0a0a;
    /* display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 6rem calc(100% - 6rem);
    justify-content: center;
    align-content: center; */
  }
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
  return (
    <UserSt id="app">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={app.login.token === "" ? <Welcome /> : <Navigate to="/browser/home" />}
        />
        <Route path="/login" element={app.login.token === "" ? <Login /> : <Navigate to="/" />} />
        <Route path="/welcome" element={app.login.token === "" ? <Navigate to="/" /> : <Home />} />

        {app.login.token !== "" && <Route path="/home" element={<Home />} />}
        {app.login.token !== "" && <Route path="/premieres" element={<Premieres />} />}
        {app.login.token !== "" && <Route path="/movies" element={<AllMovies />} />}
        {app.login.token !== "" && <Route path="/movie/:id" element={<Movie />} />}
        {app.login.token !== "" && <Route path="/genre/:genre" element={<ListMoviesGenre />} />}
        {app.login.token !== "" && <Route path="/category" element={<Categories />} />}
        {app.login.token !== "" && <Route path="/search" element={<Search />} />}
        {app.login.token !== "" && <Route path="/profile" element={<Profile />} />}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </UserSt>
  );
};

export default User;

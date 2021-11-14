import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// *Fonts
import "fonts/fonts.css";
// *Components

import Home from "components/user/pages/Home";
import AllMovies from "components/user/pages/AllMovies";
// import AllSeries from "components/user/pages/AllSeries";
import Premieres from "components/user/pages/Premieres";
import ListMoviesGenre from "components/user/pages/ListMoviesGenre";
import Navigation from "components/user/organisms/Navigation";
import styled from "styled-components";
import Movie from "components/user/pages/Movie";
import Search from "components/user/pages/Search";
import Profile from "components/user/pages/Profile";
import Clients from "components/user/pages/Clients";
import MediaContent from "components/user/pages/MediaContent";
import AddMedia from "components/user/organisms/AddMedia";
import Login from "components/user/pages//Login";
// import Home from "./home/pages/Home";
// import Reseller from "./user/pages/Reseller";

import Error404 from "./Error404";

import Categories from "./user/pages/Categories";
import Welcome from "./user/pages/Welcome";
import CreateUser from "./user/organisms/CreateUser";
import UpdateUser from "./user/organisms/UpdateUser";
import UpdateMedia from "./user/organisms/UpdateMedia";
import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "interfaces/storeTemplate";
import { loginServer } from "redux/actions/appAction";

const AppSt = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 5rem calc(100% - 5rem);
  justify-content: center;
  align-content: center;
  color: white;
  background: #000000;
  background: linear-gradient(90deg, #000000 0%, #0c0c0e 100%);
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 6rem calc(100% - 6rem);
    justify-content: center;
    align-content: center;
  }
`;

function App() {
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
    <Router>
      <AppSt id="app">
        <Navigation />
        <Routes>
          <Route path="/" element={app.login.token === "" ? <Navigate to="/welcome" /> : <Navigate to="/home" />} />
          <Route path="/login" element={app.login.token === "" ? <Login /> : <Navigate to="/" />} />
          <Route path="/welcome" element={app.login.token === "" ? <Welcome /> : <Navigate to="/" />} />
          {app.login.token !== "" && <Route path="/home" element={<Home />} />}
          {app.login.token !== "" && <Route path="/premieres" element={<Premieres />} />}
          {app.login.token !== "" && <Route path="/movies" element={<AllMovies />} />}
          {app.login.token !== "" && <Route path="/movie/:id" element={<Movie />} />}
          {app.login.token !== "" && <Route path="/genre/:genre" element={<ListMoviesGenre />} />}
          {app.login.token !== "" && <Route path="/category" element={<Categories />} />}
          {app.login.token !== "" && <Route path="/search" element={<Search />} />}
          {app.login.token !== "" && <Route path="/profile" element={<Profile />} />}
          {/* //!Admin */}
          {app.login.role === "admin" && <Route path="/clients" element={<Clients />} />}
          {app.login.role === "admin" && <Route path="/create-user" element={<CreateUser />} />}
          {app.login.role === "admin" && <Route path="/update-user/:id" element={<UpdateUser />} />}
          {app.login.role === "admin" && <Route path="/media" element={<MediaContent />} />}
          {app.login.role === "admin" && <Route path="/add-media" element={<AddMedia />} />}
          {app.login.role === "admin" && <Route path="/update-media/:id" element={<UpdateMedia />} />}

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AppSt>
    </Router>
  );
}

export default App;

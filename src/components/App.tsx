import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// *Fonts
import "fonts/fonts.css";
// *Components

import Home from "components/user/pages/Home";
import AllMovies from "components/user/pages/AllMovies";
import AllSeries from "components/user/pages/AllSeries";
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

const AppSt = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 5rem calc(100% - 5rem);
  justify-content: center;
  align-content: center;
  color: white;
  background: #080808;
  background: linear-gradient(90deg, #0d0c13 0%, #120d25 100%);
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 5rem calc(100% - 5rem);
    justify-content: center;
    align-content: center;
  }
`;

function App() {
  // const dispacth = useDispatch();
  // const handleShowMenu = () => {
  //   dispacth(showMenu(!app.showMenu));
  // };

  return (
    <Router>
      <AppSt id="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/premieres" element={<Premieres />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/series" element={<AllSeries />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/media" element={<MediaContent />} />
          <Route path="/media/add-media" element={<AddMedia />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/genre/:genre" element={<ListMoviesGenre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/update-user/:id" element={<UpdateUser />} />
          <Route path="/category" element={<Categories />} />
          <Route element={<Error404 />} />
        </Routes>
      </AppSt>
    </Router>
  );
}

export default App;

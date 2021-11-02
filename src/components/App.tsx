import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
// *Fonts
import "fonts/fonts.css";
import Categories from "./user/pages/Categories";
// *Hooks
// import ScrollMemory from "react-router-scroll-memory";

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
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/premieres" component={Premieres} />
          <Route path="/movies" component={AllMovies} />
          <Route path="/series" component={AllSeries} />
          <Route path="/search" component={Search} />
          <Route path="/profile" component={Profile} />
          <Route path="/clients" component={Clients} />
          <Route path="/media" exact component={MediaContent} />
          <Route path="/media/add-media" component={AddMedia} />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/genre/:genre" component={ListMoviesGenre} />
          <Route path="/login" component={Login} />
          <Route path="/category" component={Categories} />
          <Route component={Error404} />
        </Switch>
      </AppSt>
    </Router>
  );
}

export default App;

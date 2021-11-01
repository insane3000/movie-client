import Error404 from "components/Error404";
import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeReseller from "./HomeReseller";
import AllMovies from "./AllMovies";
import AllSeries from "./AllSeries";
import Premieres from "./Premieres";
// import Mylist from "./Mylist";
import ListMoviesGenre from "./ListMoviesGenre";
import Navigation from "../organisms/Navigation";
import styled from "styled-components";
import Movie from "./Movie";
import Search from "./Search";
import Profile from "./Profile";
import Clients from "./Clients";
import MediaContent from "./MediaContent";
import AddMedia from "./AddMedia";

const ResellerSt = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 5rem calc(100% - 5rem);
  justify-content: center;
  align-content: center;
  color: white;
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
const Reseller = () => {
  return (
    <ResellerSt>
      <Navigation />
      <Switch>
        <Route path="/reseller/home"   component={HomeReseller} />
        <Route path="/reseller/search" component={Search} />
        <Route path="/reseller/profile" component={Profile} />
        <Route path="/reseller/clients" component={Clients} />
        <Route path="/reseller/media" exact component={MediaContent} />
        <Route path="/reseller/media/add-media" component={AddMedia} />
        <Route path="/reseller/movies/all-movies" exact component={AllMovies} />
        {/* <Route path="/reseller/movie/:id" component={Movie} /> */}
        <Route path="/reseller/movie/:id" component={Movie} />

        <Route path="/reseller/genre/:genre" component={ListMoviesGenre} />
        <Route path="/reseller/series/all-series"  component={AllSeries} />
        <Route path="/reseller/premieres" component={Premieres} />
        {/* <Route path="/reseller/mylist" component={Mylist} /> */}
        <Route component={Error404} />
      </Switch>
    </ResellerSt>
  );
};

export default Reseller;

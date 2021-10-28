import Error404 from "components/Error404";
import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeReseller from "./HomeReseller";
import AllMovies from "./AllMovies";
import AllSeries from "./AllSeries";
import Movie from "./Movie";
import Premieres from "./Premieres";
import Mylist from "./Mylist";
import ListMoviesGenre from "./ListMoviesGenre";
import Navigation from "../organisms/Navigation";
import styled from "styled-components";

const ResellerSt = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 5rem calc(100% - 5rem);
  }
`;
const Reseller = () => {
  return (
    <ResellerSt>
      <Navigation />
      <Switch>
        <Route path="/reseller" exact component={HomeReseller} />
        <Route path="/reseller/movies/all-movies" component={AllMovies} />
        <Route path="/reseller/movie/:id" component={Movie} />
        <Route path="/reseller/genre/:genre" component={ListMoviesGenre} />
        <Route path="/reseller/series/all-series" component={AllSeries} />
        <Route path="/reseller/premieres" component={Premieres} />
        <Route path="/reseller/mylist" component={Mylist} />
        <Route component={Error404} />
      </Switch>
    </ResellerSt>
  );
};

export default Reseller;

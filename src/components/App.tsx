import React from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// *Components
// import Home from "./home/pages/Home";
import User from "./user/pages/User";

import Error404 from "./Error404";
// *Fonts
import "fonts/fonts.css";

const AppSt = styled.div`
  width: 100%;
  height: 100%;
  /* background: #e4e4e4;
  display: flex;
  justify-content: center;
  align-items: center; */
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
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
        <Switch>
          <Route path="/" exact component={User} />
          {/* <Route path="/:id" component={User} /> */}
          <Route component={Error404} />
        </Switch>
      </AppSt>
    </Router>
  );
}

export default App;

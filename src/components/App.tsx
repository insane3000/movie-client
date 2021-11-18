import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// *Img
import TextureBg from "img/texture-bg.png";
// *Fonts
import "fonts/fonts.css";
import styled from "styled-components";
import Admin from "components/admin/Admin";
import Error404 from "./Error404";

import { useDispatch } from "react-redux";
import { loginServer } from "redux/actions/appAction";
import Browser from "./browser/Browser";

const AppSt = styled.div`
  width: 100%;
  height: 100%;
  /* display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 5rem calc(100% - 5rem);
  justify-content: center;
  align-content: center;
  color: white;
  background: #000000;
  background: linear-gradient(90deg, #000000 0%, #0c0c0e 100%); */
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    /* overflow-y: scroll; */
    /* display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 6rem calc(100% - 6rem);
    justify-content: center;
    align-content: center; */

    /* //! PLex backgound
    background-image: url("https://user-images.githubusercontent.com/63812189/79506691-4af78900-7feb-11ea-883e-87b8e05ceb1c.png");
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #3f4245;
    background-attachment: fixed;
    background-position: center; */
    background: rgba(0, 0, 0, 0) url(${TextureBg}) repeat scroll 0% 0%;
    background-color: #141e30; /* fallback for old browsers */
    background: #232526; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #414345,
      #232526
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #414345,
      #232526
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`;

function App() {
  const dispatch = useDispatch();
  // const app = useSelector((store: StoreInterface) => store.app);
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
        <Routes>
          <Route path="/" element={<Navigate to="/browser" />} />
          <Route path="/browser/*" element={<Browser />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AppSt>
    </Router>
  );
}

export default App;

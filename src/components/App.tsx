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
  background: #0a0a0a;
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

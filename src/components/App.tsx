import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// *Fonts
import "fonts/fonts.css";
import styled from "styled-components";
import Error404 from "./Error404";
import { useDispatch, useSelector } from "react-redux";
import { loginServer } from "redux/actions/appAction";
import Browser from "./browser/Browser";
import Welcome from "./Welcome";
import { StoreInterface } from "interfaces/storeTemplate";
const AppSt = styled.div`
  width: 100vw;
  height: 100vh;
  background: #05010eee;
  background: #111111;
  background: #070707;
  .toast {
    width: auto;
    height: 3rem;
    background: #ffffff;
    font-family: "Roboto 300";
    font-size: 1rem;
    user-select: none;
  }
`;

function App() {
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  useEffect(() => {
    dispatch(
      loginServer(
        `${localStorage.getItem("user") === null ? "" : localStorage.getItem("user")}`,
        `${localStorage.getItem("token") === null ? "" : localStorage.getItem("token")}`,
        `${localStorage.getItem("role") === null ? "" : localStorage.getItem("role")}`
      )
    );
  }, [dispatch]);
  return (
    <Router>
      <AppSt id="app">
        <Toaster
          toastOptions={{
            className: "toast",
          }}
        />
        <Routes>
          <Route
            path="/"
            element={app.login.token === "" ? <Welcome /> : <Navigate to="browser/home" />}
          />
          {app.login.token !== "" && <Route path="/browser/*" element={<Browser />} />}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AppSt>
    </Router>
  );
}

export default App;

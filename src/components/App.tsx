import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// *Fonts
import "fonts/fonts.css";
import styled from "styled-components";
import Admin from "components/admin/Admin";
import Error404 from "./Error404";

import { useDispatch } from "react-redux";
import { loginServer } from "redux/actions/appAction";
import Browser from "./browser/Browser";
// import { StoreInterface } from "interfaces/storeTemplate";
// import Modal from "./Modal";
const AppSt = styled.div`
  width: 100vw;
  height: 100vh;
  

  background: #05010eee;
  /* display: flex;
  justify-content: center;
  align-items: center; */
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
  // const handleModal = () => {
  //   dispatch(setModal(false));
  // };
  return (
    <Router>
      <AppSt id="app">
        <Routes>
          <Route path="/" element={<Navigate to="/browser" />} />
          <Route path="/browser/*" element={<Browser />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        {/* {app.modal && (
          <ModalSt>
            <h1 onClick={handleModal}>modal</h1>
          </ModalSt>
        )} */}
      </AppSt>
    </Router>
  );
}

export default App;

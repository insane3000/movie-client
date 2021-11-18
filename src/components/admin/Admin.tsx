import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Error404 from "../Error404";
import Login from "components/admin/pages/Login";
import Navigation from "components/admin/organisms/Navigation-admin";
import Media from "components/admin/pages/Media";
import Clients from "components/admin/pages/Clients";

import AddMedia from "components/admin/organisms/AddMedia";
import UpdateMedia from "components/admin/organisms/UpdateMedia";
import AddUser from "components/admin/organisms/AddUser";
import UpdateUser from "components/admin/organisms/UpdateUser";

const AdminSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 100%;
  }
`;

const Admin = () => {
  return (
    <AdminSt>
      <Navigation />
      <Routes>
        <Route path="/media" element={<Media />} />
        <Route path="/add-media" element={<AddMedia />} />
        <Route path="/update-media/:id" element={<UpdateMedia />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/create-user" element={<AddUser />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </AdminSt>
  );
};

export default Admin;

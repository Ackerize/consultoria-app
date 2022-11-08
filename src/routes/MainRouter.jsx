import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Page404 from "../screens/404";
import Chats from "../screens/Chats";
import Home from "../screens/Home";
import Requests from "../screens/Requests";
import Search from "../screens/Search";

const MainRouter = ({ initialRoute }) => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Navbar />
        <div className="layout-page">
          <Routes>
            <Route path="/inicio" element={<Home />} />
            <Route path="/solicitudes" element={<Requests />} />
            <Route path="/mensajes" element={<Chats />} />
            <Route path="/busqueda" element={<Search />} />
            <Route
              path="*"
              element={
                initialRoute ? <Navigate to={initialRoute} /> : <Page404 auth={true} name="Ir a Inicio" pathname={"/inicio"} />
              }
            />
          </Routes>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default MainRouter;

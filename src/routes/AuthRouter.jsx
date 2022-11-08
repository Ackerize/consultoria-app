import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Page404 from "../screens/404";
import Login from "../screens/Login";
import Register from "../screens/Register";

const AuthRouter = ({ initialRoute }) => {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route
        path="*"
        element={
          initialRoute ? (<Navigate to={initialRoute} />) :
          <Page404
            auth={false}
            name={"Iniciar sesión"}
            pathname="/auth/login"
          />
        }
      />
    </Routes>
  );
};

export default AuthRouter;

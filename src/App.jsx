import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// styles
import "./main.css";

// routes
import AuthRouter from "./routes/AuthRouter";
import MainRouter from "./routes/MainRouter";
// context
import { UserContext } from "./context/UserContext";

function App() {
  const { user, verifyToken } = useContext(UserContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3500} theme="colored" />
      {user.isLogged ? (
        <MainRouter initialRoute={"/inicio"} />
      ) : (
        <AuthRouter initialRoute={"/auth/login"} />
      )}
    </BrowserRouter>
  );
}

export default App;

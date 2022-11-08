import React, { createContext, useState, useCallback } from "react";
import authService from "../services/auth.services";
export const UserContext = createContext();

const initialState = {
  token: null,
  user: null,
  isLogged: false,
};

export const UserProvider = ({ children }) => {
  const localState = JSON.parse(
    localStorage.getItem("consultancy-user") ||
      sessionStorage.getItem("consultancy-user")
  );
  const [user, setUser] = useState(localState || initialState);

  const updateUser = (newToken, newUser, remember = false) => {
    const newData = {
      token: newToken,
      user: newUser,
      isLogged: newToken ? true : false,
    };

    if (remember) {
      localStorage.setItem("consultancy-user", JSON.stringify(newData));
    } else {
      sessionStorage.setItem("consultancy-user", JSON.stringify(newData));
    }

    if (!newToken) {
      localStorage.removeItem("consultancy-user");
      sessionStorage.removeItem("consultancy-user");
    }
    setUser(newData);
  };

  const verifyToken = useCallback(async () => {
    const { token } = user;
    if (!token) {
      setUser(initialState);
      return false;
    }

    const resp = await authService.renewToken(token);
    if (resp.ok) {
      setUser({
        ...user,
        isLogged: true,
        token: resp.token,
      });
      return true;
    } else {
      setUser(initialState);
      return false;
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        verifyToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

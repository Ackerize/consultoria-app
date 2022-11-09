import React, { useContext, useEffect, createContext } from "react";

import { UserContext } from "./UserContext";
import { ChatContext } from "./chat/ChatContext";
import { useSocket } from "../hooks/useSocket";

import { types } from "../types/types";
import {
  scrollToBottomAnimated,
} from "../utils/scrollToBottom";
import { SOCKETS_BASE_URL_DEV, SOCKETS_BASE_URL_PROD } from "../constants/constants";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket(
    SOCKETS_BASE_URL_DEV
  );
  const { user: auth } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.isLogged && auth.token) {
      conectarSocket(auth.token);
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.isLogged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  // Escuchar los cambios en los usuarios conectados
  useEffect(() => {
    socket?.on("lista-usuarios", (usuarios) => {
      console.log("lista-usuarios: ", usuarios, " - ", new Date());
      dispatch({
        type: types.usuariosCargados,
        payload: usuarios,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("mensajes", (mensajes) => {
      dispatch({
        type: types.cargarMensajes,
        payload: mensajes,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("mensaje-personal", (mensaje) => {
      dispatch({
        type: types.nuevoMensaje,
        payload: mensaje,
      });

      scrollToBottomAnimated("mensajes");
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};

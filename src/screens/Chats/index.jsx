import React, { useState, useContext, useEffect } from "react";
import ChatList from "../../components/ChatList";
import ChatTitle from "../../components/ChatTitle";
import MessageInput from "../../components/MessageInput";
import MessageList from "../../components/MessageList";
import { ChatContext } from "../../context/chat/ChatContext";
import { types } from "../../types/types";

const Chats = () => {
  const { chatState, dispatch } = useContext(ChatContext);
  const [chatInfo, setChatInfo] = useState(null);

  useEffect(() => {
    setChatInfo(null);

    dispatch({
      type: types.activarChat,
      payload: null,
    });
  }, []);

  useEffect(() => {
    setChatInfo(
      chatState.chatActivo
        ? chatState.usuarios.find((u) => u._id === chatState.chatActivo)
        : null
    );
  }, [chatState]);

  return (
    <div className="layout">
      <ChatList />
      <div
        className={"main" + (chatInfo ? " main-visible" : "")}
        data-mobile-height=""
      >
        <div id="chat-1" className="chat dropzone-form-js">
          <div className="chat-body">
            {chatInfo ? (
              <>
                <ChatTitle name={chatInfo?.name} status={chatInfo?.online} />
                <MessageList messages={chatState.mensajes} />
                <MessageInput />
              </>
            ) : (
              <div className="no-chat-selected">
                Selecciona un chat para iniciar la conversación
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;

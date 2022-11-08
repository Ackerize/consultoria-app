import React, { useContext, useEffect } from "react";
import Message from "../Message";
import { UserContext } from "../../context/UserContext";
import { ChatContext } from "../../context/chat/ChatContext";
import { scrollToBottomAnimated } from "../../utils/scrollToBottom";

const MessageList = ({ messages }) => {
  const { user } = useContext(UserContext);	
  const { chatState } = useContext(ChatContext);

  useEffect(() => {
    scrollToBottomAnimated("mensajes");
  }, [chatState]);
  

  return (
    <div className="chat-content px-lg-8" id="mensajes">
      <div className="container-xxl py-6 py-lg-10" >
        {
          messages.map((m, i) => (
            <Message key={m._id} message={m} sent={m.from === user.user.uid} />
          ))
        }
        {/* <Message sent={false} />
        <Message sent /> */}
        {/* <Divider /> */}
      </div>
      <div className="end-of-chat" ></div>
    </div>
  );
};

export default MessageList;

const Divider = () => {
  return (
    <div className="message-divider my-9 mx-lg-5">
      <div className="row align-items-center">
        <div className="col">
          <hr />
        </div>

        <div className="col-auto">
          <small className="text-muted">Today</small>
        </div>

        <div className="col">
          <hr />
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import { ChatContext } from "../../context/chat/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import { useForm } from "../../hooks/useForm";
import { isMessageValid } from "../../utils/validator";

const MessageInput = () => {
  const { socket } = useContext(SocketContext);
  const { chatState, dispatch } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const [formValues, handleInputChange, reset] = useForm({
    to: chatState.chatActivo,
    from: user.user.uid,
    content: "",
  });

  useEffect(() => {
    if (chatState.chatActivo) {
      handleInputChange({
        target: {
          name: "to",
          value: chatState.chatActivo,
        },
      });
    }
  }, [chatState.chatActivo]);

  const onSendMessage = (e) => {
    try {
      e.preventDefault();
      isMessageValid(formValues);
      socket.emit("mensaje-personal", formValues, (response) => {
        if (!response.ok) {
          toast.warn(response.msg);
        }
        reset();
      });
    } catch (error) {
      toast.warn(error.message);
    }
  };

  const onKeyPress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(e);
      return false;
    }
    
  };

  return (
    <div className="chat-footer border-top py-4 py-lg-6 px-lg-8">
      <div className="container-xxl">
        <form id="chat-id-1-form" data-emoji-form="" onSubmit={onSendMessage}>
          <div className="form-row align-items-center">
            <div className="col">
              <div className="input-group form-message">
                <textarea
                  id="chat-id-1-input"
                  className="form-control bg-transparent border-0"
                  placeholder="Ingresa tu mensaje..."
                  rows="1"
                  data-emoji-input=""
                  data-autosize="true"
                  name="content"
                  value={formValues.content}
                  onChange={handleInputChange}
                  onKeyDown={onKeyPress}
                ></textarea>

                <div className="input-group-append">
                  <button
                    className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                    type="button"
                    data-emoji-btn=""
                    style={{ display: "none" }}
                  ></button>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-ico btn-primary bg-send-mg rounded-circle"
                type="submit"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;

import React from "react";
import { getMessageDate } from "../../utils/date-parse";

const Message = ({ sent = true, message }) => {
  
  return (
    <div className={`message ${sent ? "message-right" : ""}`}>
      <div className={`avatar avatar-sm ${sent ? "ml-4 ml-lg-5 d-none d-lg-block" : "mr-4 mr-lg-5"}`}>
        <img className="avatar-img" src="./avatar.png" alt="avatar" />
      </div>

      <div className="message-body">
        <div className="message-row">
          <div className={`d-flex align-items-center ${sent ? "justify-content-end" : ""}`}>
            <div className={`message-content bg-${sent ? 'sent text-white' : 'received'}`}>
              <div>
                { message.content }
              </div>

              <div className="mt-1">
                <small className="opacity-65">{
                  getMessageDate(message.createdAt, false, true)
                }</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Message;

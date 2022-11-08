import React from "react";
import { getMessageDate } from "../../utils/date-parse";

const ChatItem = ({ onClick, user }) => {
  const time = getMessageDate(user.lastMessage.createdAt);
  return (
    <div className="text-reset nav-link p-0 mb-6 cursor-pointer" onClick={onClick}>
      <div className="card card-active-listener card-no-shadow">
        <div className="card-body">
          <div className="media">
            <div className="avatar mr-5">
              <img
                className="avatar-img"
                src="./avatar.png"
                alt="Bootstrap Themes"
              />
            </div>

            <div className="media-body overflow-hidden">
              <div className="d-flex align-items-center mb-1">
                <h6 className="text-truncate mb-0 mr-auto">{ user.name }</h6>
                <p className="small text-muted text-nowrap ml-4">{ time }</p>
              </div>
              <div className="text-truncate">
                {
                  user.lastMessage.content
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;

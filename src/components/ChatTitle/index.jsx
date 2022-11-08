import React, { useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import { ChatContext } from "../../context/chat/ChatContext";
import { types } from "../../types/types";

const ChatTitle = ({ name, status }) => {
  const { dispatch, chatState } = useContext(ChatContext);
  
  const goToBack = () => {
    dispatch({
      type: types.activarChat,
      payload: null,
    });
  };

  return (
    <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
      <div className="container-xxl">
        <div className="row align-items-center">
          <div className="col-3 d-xl-none">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <div
                  className="text-muted px-0 cursor-pointer"
                  onClick={goToBack}
                >
                  <IoChevronBack size={25} />
                </div>
              </li>
            </ul>
          </div>
          <div className="col-6 col-xl-6">
            <div className="media text-center text-xl-left">
              <div className="avatar avatar-sm d-none d-xl-inline-block mr-5">
                <img src="./avatar.png" className="avatar-img" alt="" />
              </div>

              <div className="media-body align-self-center text-truncate">
                <h6 className="text-truncate" style={{ marginBottom: 0 }}>
                  {name}
                </h6>
                <small className={status ? "text-online" : "text-muted"}>
                  {status ? "Online" : "Offline"}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTitle;

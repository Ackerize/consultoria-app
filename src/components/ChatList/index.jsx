import React, { useContext, useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import { ChatContext } from "../../context/chat/ChatContext";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import useDebounce from "../../hooks/useDebounce";
import { types } from "../../types/types";
import { searchUsers } from "../../utils/arrays";
import { toggleMenu } from "../../utils/dom-manipulation";
import ChatItem from "../ChatItem";

const ChatList = () => {
  const { chatState, dispatch } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);
  const { user: auth } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChats, setFilteredChats] = useState(chatState.usuarios);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilteredChats(searchUsers(chatState.usuarios, debouncedSearchTerm));
    } else {
      setFilteredChats(chatState.usuarios);
    }
  }, [debouncedSearchTerm, chatState.usuarios]);

  const onSelectChat = (user) => {
    console.log(user);
    dispatch({
      type: types.activarChat,
      payload: user._id,
    });

    socket.emit("obtener-mensajes", { from: user._id, to: auth.user.uid });
  };

  return (
    <div className="sidebar">
      <div className="tab-content h-100" role="tablist">
        <div
          className="tab-pane fade h-100 show active"
          id="tab-content-dialogs"
          role="tabpanel"
        >
          <div className="d-flex flex-column h-100">
            <div className="hide-scrollbar">
              <div className="container-fluid py-6">
                <div className="d-flex mb-6 align-items-center">
                  <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <div
                      className="nav-item nav-link px-0 "
                      onClick={toggleMenu}
                    >
                      <HiMenu size={25} />
                    </div>
                  </div>
                  <h2 className="font-bold mb-0">Chats</h2>
                </div>
                
                <form className="mb-6">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-lg form-search"
                      placeholder="Search for messages or users..."
                      aria-label="Search for messages or users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-lg btn-ico btn-search btn-minimal"
                        type="submit"
                      >
                        <BiSearch />
                      </button>
                    </div>
                  </div>
                </form>
                <nav className="nav d-block list-discussions-js mb-n6">
                  {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                      <ChatItem
                        key={chat._id}
                        user={chat}
                        onClick={() => onSelectChat(chat)}
                      />
                    ))
                  ) : (
                    <div className="no-chat-selected">
                      No se encontraron chats
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;

import React, { useContext } from "react";
// styles
import "./styles.css";
// icons
import { MdAdd } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { getFirstNameAndLastName } from "../../utils/data-parse";
import { UserContext } from "../../context/UserContext";

const User = ({ data = {}, onMessage, onConsultancy }) => {
  const { user } = useContext(UserContext);
  const { name, areas, online } = data;
  return (
    <div className="consultor-container">
      <div
        className={"consultor-content" + (areas?.length > 2 ? " areas" : "")}
      >
        <div
          className={`avatar ${online ? "avatar-online" : ""} consultor-img`}
        >
          <img src="avatar.png" alt="consultor" />
        </div>
        <p className="consultor-name">{getFirstNameAndLastName(name)}</p>
        <div className="consultor-areas">
          {areas?.map((area, index) => (
            <span key={index} className="badge rounded-pill bg-label-info">
              {area}
            </span>
          ))}
        </div>
      </div>
      <div className={"consultor-buttons " + (user.user.type !== "cliente" ? "justify-content-center" : "")}>
        {user.user.type === "cliente" && (
          <button className="schedule-btn" onClick={onConsultancy}>
            Agendar
            <MdAdd size={18} />
          </button>
        )}
        <button className="message-btn" onClick={onMessage}>
          Mensaje
          <FiMessageSquare size={18} />
        </button>
      </div>
    </div>
  );
};

export default User;

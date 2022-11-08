import React from "react";
import { Link } from "react-router-dom";
import { toggleMenu } from "../../utils/dom-manipulation";

const NavItem = ({ icon: Icon, label, active, onClick, path }) => {
  const Content = () => (
    <div className="menu-link">
      <i className="menu-icon">
        <Icon size={20} />
      </i>
      <div data-i18n="Analytics">{label}</div>
    </div>
  );
  return (
    <>
      {path ? (
        <Link
          to={path}
          className={"menu-item" + (active ? " active" : "")}
          onClick={toggleMenu}
        >
          <Content />
        </Link>
      ) : (
        <li
          className={"menu-item" + (active ? " active" : "")}
          onClick={onClick}
        >
          <Content />
        </li>
      )}
    </>
  );
};

export default NavItem;

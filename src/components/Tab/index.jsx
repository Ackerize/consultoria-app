import React from "react";

const Tab = ({
  icon: Icon,
  label,
  active = false,
  onClick,
  color,
  bgColor,
}) => {
  return (
    <li className="nav-item">
      <button
        type="button"
        className={"nav-link " + (active ? "active" : "")}
        role="tab"
        data-bs-toggle="tab"
        data-bs-target="#navs-justified-messages"
        aria-controls="navs-justified-messages"
        aria-selected={active}
        onClick={onClick}
        style={{
          ...(color && active ? { color } : {}),
          ...(bgColor && active ? { backgroundColor: bgColor } : {}),
        }}
      >
        <Icon size={18} /> <span className="ml-2">{label}</span>
      </button>
    </li>
  );
};

export default Tab;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiSearch } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import { UserContext } from "../../context/UserContext";
import {
  capitalizeString,
  getFirstNameAndLastName,
} from "../../utils/data-parse";
import { toggleMenu } from "../../utils/dom-manipulation";

const SearchBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.length > 2) {
      navigate(`/busqueda?term=${searchTerm}`);
      setSearchTerm("");
    } else {
      toast.warn("La búsqueda debe tener al menos 3 caracteres");
    }
  };

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <div className="nav-item nav-link px-0 me-xl-4" onClick={toggleMenu}>
          <HiMenu size={25} />
        </div>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <form className="navbar-nav align-items-center" onSubmit={handleSubmit}>
          <div className="nav-item d-flex align-items-center">
            <div className="cursor-pointer" onClick={handleSubmit}>
              <BiSearch size={25} />
            </div>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Buscar..."
              aria-label="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <div
              className={
                "nav-link dropdown-toggle hide-arrow" +
                (showDropdown ? " show" : "")
              }
              data-bs-toggle="dropdown"
              aria-expanded={showDropdown}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="avatar avatar-online">
                <img
                  src="./avatar.png"
                  alt="avatar"
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </div>
            <ul
              className={
                "dropdown-menu dropdown-menu-end" +
                (showDropdown ? " show" : "")
              }
              data-bs-popper="none"
            >
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img
                          src="avatar.png"
                          alt="avatar"
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">
                        {getFirstNameAndLastName(user.user.name)}
                      </span>
                      <small className="text-muted">
                        {capitalizeString(user.user.type)}
                      </small>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SearchBar;

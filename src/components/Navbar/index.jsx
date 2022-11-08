import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
// icons
import { AiOutlineHome } from "react-icons/ai";
import { GrList, GrSearch } from "react-icons/gr";
import { BsChatDots } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdKeyboardArrowLeft } from "react-icons/md";
// components
import NavItem from "../NavItem";
import WarningModal from "../WarningModal";
// context
import { UserContext } from "../../context/UserContext";
import { toggleMenu } from "../../utils/dom-manipulation";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const { updateUser } = useContext(UserContext);

  const onLogout = () => {
    updateUser(null, null);
  };

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="app-brand demo">
          <div
            onClick={toggleMenu}
            className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
          >
            <i className="align-middle">
              <MdKeyboardArrowLeft size={25} />
            </i>
          </div>
        </div>
        <div className="menu-inner-shadow"></div>
        <ul className="menu-inner py-1">
          <NavItem
            label={"Inicio"}
            icon={AiOutlineHome}
            active={location?.pathname === "/inicio"}
            path={"/inicio"}
          />
          <NavItem
            label={"Búsqueda"}
            icon={GrSearch}
            active={location?.pathname === "/busqueda"}
            path={"/busqueda"}
          />
          <NavItem
            label={"Solicitudes"}
            icon={GrList}
            active={location?.pathname === "/solicitudes"}
            path={"/solicitudes"}
          />
          <NavItem
            label={"Mensajes"}
            icon={BsChatDots}
            active={location?.pathname === "/mensajes"}
            path={"/mensajes"}
          />
        </ul>
        <ul className="menu-inner menu-bottom py-1">
          <NavItem
            label={"Cerrar sesión"}
            icon={FiLogOut}
            onClick={() => {
              toggleMenu();
              setShowModal(true)
            }}
          />
        </ul>
      </aside>
      <WarningModal
        visible={showModal}
        title={"Cerrar sesión"}
        body={"¿Estás seguro que deseas cerrar sesión?"}
        acceptLabel={"Aceptar"}
        declineLabel={"Cancelar"}
        onDimiss={() => setShowModal(false)}
        onAccept={onLogout}
      />
    </>
  );
};

export default Navbar;

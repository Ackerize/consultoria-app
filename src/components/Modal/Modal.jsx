import React, { useEffect, useState } from "react";

const Modal = ({ title, show, toggle, children }) => {
  const [display, setDisplay] = useState("none");
  useEffect(() => {
    if (show) {
      setDisplay("block");
    } else {
      setTimeout(() => {
        setDisplay("none");
      }, 501);
    }
  }, [show]);
  return (
    <>
      <div
        className={
          "modal fade" +
          (show
            ? " show animate__animated animate__fadeInDown"
            : " animate__animated animate__fadeOutUp")
        }
        style={{ display }}
        tabIndex="-1"
        {...(show
          ? { "aria-modal": "true", role: "dialog" }
          : { "aria-hidden": "true" })}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggle}
              ></button>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className={"modal-backdrop fade" + (show ? " show" : "")}></div>
    </>
  );
};

export default Modal;

export const ModalBody = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

export const ModalFooter = ({ children }) => {
  return <div className="modal-footer">{children}</div>;
};

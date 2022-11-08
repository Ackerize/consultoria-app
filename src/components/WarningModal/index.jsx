import React from "react";
import { ClipLoader } from "react-spinners";
import Modal, { ModalBody, ModalFooter } from "../Modal/Modal";

const WarningModal = ({ title, onDimiss, onAccept, body, visible, acceptLabel, declineLabel, btnType= 'primary', loading }) => {
  return (
    <Modal title={title} show={visible} toggle={onDimiss}>
      <ModalBody>
        <p>{ body }</p>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-dismiss="modal"
          onClick={!loading ? onDimiss : () => {}}
        >
          { declineLabel }
        </button>
        <button type="button" className={`btn btn-${btnType}`} onClick={!loading ? onAccept : () => {}}>
          { loading ? <ClipLoader size={18} color="#fff" /> : acceptLabel }
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default WarningModal;

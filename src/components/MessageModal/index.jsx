import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
// components
import { useForm } from "../../hooks/useForm";
import Modal, { ModalBody, ModalFooter } from "../Modal/Modal";
import FormInput from "../FormInput";
// contexts
import { UserContext } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";
// utils
import { isMessageValid } from "../../utils/validator";

const MessageModal = ({ show, onHide, userSelected }) => {
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    to: userSelected?.uid,
    from: user.user.uid,
    content: "",
  });

  useEffect(() => {
    handleInputChange({
      target: {
        name: "to",
        value: userSelected?.uid,
      },
    });
  }, [userSelected]);

  const onSendMessage = () => {
    try {
      setLoading(true);
      isMessageValid(formValues);
      socket.emit("mensaje-personal", formValues, (response) => {
        toast.success(response.msg);
        setLoading(response.loading);
        onHide();
        reset();
      });
    } catch (error) {
      setLoading(false);
      toast.warn(error.message);
    }
  };
  return (
    <Modal title={"Nuevo mensaje"} show={show} toggle={onHide}>
      <ModalBody>
        <div className="row">
          <FormInput
            label={"Para:"}
            name="to"
            type="text"
            disabled
            defaultValue={userSelected?.name}
          />
        </div>
        <div className="row mt-3">
          <FormInput
            type="text"
            mode="textarea"
            label="Mensaje"
            name="content"
            value={formValues.content}
            onChange={handleInputChange}
            placeholder="Ingresa tu mensaje"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-dismiss="modal"
          onClick={
            !loading
              ? () => {
                  reset();
                  onHide();
                }
              : () => {}
          }
        >
          Cancelar
        </button>
        <button
          type="button"
          className={`btn btn-primary`}
          onClick={!loading ? onSendMessage : () => {}}
        >
          {loading ? <ClipLoader size={18} color="#fff" /> : "Enviar"}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default MessageModal;

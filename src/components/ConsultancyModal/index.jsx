import React, { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
// components
import { useForm } from "../../hooks/useForm";
import Modal, { ModalBody, ModalFooter } from "../Modal/Modal";
// context
import { UserContext } from "../../context/UserContext";
// utils
import { isRequestValid } from "../../utils/validator";
// services
import consultoriaServices from "../../services/consultoria.services";
import FormInput from "../FormInput";

const ConsultancyModal = ({ show, onHide, consultor }) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    startDate: "",
    endDate: "",
    consultor: consultor?.uid,
    cliente: user.user.uid,
    description: "",
    area: "",
  });

  useEffect(() => {
    handleInputChange({
      target: {
        name: "consultor",
        value: consultor?.uid,
      },
    });
  }, [consultor]);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      isRequestValid(formValues);
      const response = await consultoriaServices.create(formValues);
      if (response.ok) {
        toast.success(response.msg);
        onHide();
        reset();
      } else {
        toast.error(response.msg);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast.warn(error.message);
    }
  };

  return (
    <Modal
      title={"Solicitar consultoría"}
      show={show}
      toggle={() => {
        onHide();
        reset();
      }}
    >
      <ModalBody>
        <div className="row">
          <FormInput
            label={"Consultor"}
            name="consultor"
            type="text"
            disabled
            defaultValue={consultor?.name}
          />
        </div>
        <div className="row g-4">
          <FormInput
            label={"Fecha inicio"}
            name="startDate"
            value={formValues.startDate}
            onChange={handleInputChange}
            type="datetime-local"
          />
          <FormInput
            label={"Fecha fin"}
            name="endDate"
            value={formValues.endDate}
            onChange={handleInputChange}
            type="datetime-local"
          />
        </div>
        <div className="row">
          <div className="col mt-3">
            <label htmlFor="area" className="form-label">
              Tema de la consultoría
            </label>
            <select
              className="form-select"
              id="area"
              name="area"
              value={formValues.area}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden>
                Selecciona un tema
              </option>
              {consultor?.areas?.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <FormInput
            type="text"
            mode="textarea"
            label="Descripción (opcional)"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Ingresa una descripción"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-dismiss="modal"
          onClick={() => {
            onHide();
            reset();
          }}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={!loading ? handleSubmit : () => {}}
        >
          {loading ? <ClipLoader size={18} color="#fff" /> : "Solicitar"}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ConsultancyModal;

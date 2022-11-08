import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
// components
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
// hooks
import { useForm } from "../../hooks/useForm";
import { UserContext } from "../../context/UserContext";
// services api
import clienteServices from "../../services/cliente.services";
import consultorServices from "../../services/consultor.services";
// utils
import { isClientValid, isConsultorValid } from "../../utils/validator";
import { capitalizeString } from "../../utils/data-parse";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null);
  const [formValues, handleInputChange, reset] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
    areas: "",
  });
  const { updateUser } = useContext(UserContext);
  const { areas, password2, ...data } = formValues;

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      isClientValid(formValues, userType);
      if (userType === "Cliente") {
        const { ok, token, msg, user, type } = await clienteServices.create(data);
        if (ok) {
          updateUser(token, { ...user, type }, false);
          reset();
          setUserType(null);
        } else {
          toast.error(msg);
        }
      } else {
        isConsultorValid(formValues);
        const areasArray = areas
          .split(",")
          .filter((area) => area !== "")
          .map((area) => capitalizeString(area));
        const { ok, token, msg, user, type } = await consultorServices.create({
          ...data,
          areas: areasArray,
        });
        if (ok) {
          updateUser(token, { ...user, type }, false);
          reset();
          setUserType(null);
        } else {
          toast.error(msg);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
      return toast.warn(error.message);
    }
  };

  return (
    <AuthLayout>
      <h4 className="mb-2">Crear una cuenta</h4>
      <p className="mb-4">Por favor, ingrese sus datos para crear una cuenta</p>
      <form className="mb-3" onSubmit={!loading ? onSubmit : () => {}}>
        <Input
          name={"name"}
          placeholder="Ingrese su nombre"
          label={"Nombre completo"}
          value={formValues.name}
          onChange={handleInputChange}
        />
        <Input
          name={"email"}
          type={"email"}
          placeholder="Ingrese su correo electrónico"
          label={"Correo electrónico"}
          value={formValues.email}
          onChange={handleInputChange}
        />
        <Input
          name={"password"}
          placeholder="Ingrese su contraseña"
          label={"Contraseña"}
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
        />
        <Input
          name={"password2"}
          placeholder="Ingrese su contraseña nuevamente"
          label={"Confirmar contraseña"}
          type="password"
          value={formValues.password2}
          onChange={handleInputChange}
        />
        <span className="form-label">Tipo de usuario</span>
        <div className="content">
          <RadioButton
            name={"one"}
            label="Consultor"
            value={userType == "Consultor"}
            onChange={() => setUserType("Consultor")}
          />
          <RadioButton
            name={"two"}
            label="Cliente"
            value={userType == "Cliente"}
            onChange={() => setUserType("Cliente")}
          />
        </div>
        {userType == "Consultor" && (
          <>
            <Input
              name={"areas"}
              placeholder="Ingrese las areas de experiencia"
              label={"Areas de experiencia (separadas por coma)"}
              value={formValues.areas}
              onChange={handleInputChange}
            />
          </>
        )}
        <div className="mb-3">
          <button
            className="btn btn-primary d-flex justify-content-center w-100"
            type="submit"
          >
            {loading ? <ClipLoader size={25} color="#fff" /> : "Crear cuenta"}
          </button>
        </div>
      </form>

      <p className="text-center footer-link">
        <span>¿Ya tienes una cuenta?</span>
        <Link to="/auth/login"> Iniciar sesión</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;

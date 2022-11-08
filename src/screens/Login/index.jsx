import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
// components
import AuthLayout from "../../components/AuthLayout";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
// hooks
import { useForm } from "../../hooks/useForm";
import { UserContext } from "../../context/UserContext";
// services api
import authServices from "../../services/auth.services";
// utils
import { isLoginValid } from "../../utils/validator";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    password: "",
    remember: false,
  });
  const { updateUser } = useContext(UserContext);
  const { email, password, remember } = formValues;

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      isLoginValid(formValues);
      const { ok, token, msg, user } = await authServices.login(
        email,
        password
      );
      if (ok) {
        const type = user.hasOwnProperty("areas") ? 'consultor' : "cliente";
        updateUser(token, { ...user, type }, remember);
        reset();
      } else {
        toast.error(msg);
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
      <h4 className="mb-2">Inicio de sesión</h4>
      <p className="mb-4">Por favor, inicie sesión en su cuenta.</p>
      <form className="mb-3" onSubmit={!loading ? onSubmit : () => {}}>
        <Input
          name={"email"}
          placeholder="Ingrese su correo electrónico"
          label={"Correo electrónico"}
          value={email}
          onChange={handleInputChange}
        />
        <Input
          name={"password"}
          placeholder="Ingrese su contraseña"
          label={"Contraseña"}
          type="password"
          value={password}
          onChange={handleInputChange}
        />
        <Checkbox
          label="Recordarme"
          id="remember-me"
          name="remember"
          value={remember}
          onChange={handleInputChange}
        />
        <div className="mb-3">
          <button
            className="btn btn-primary d-flex justify-content-center w-100"
            type="submit"
          >
            {loading ? <ClipLoader size={25} color="#fff" /> : "Iniciar sesión"}
          </button>
        </div>
      </form>

      <p className="text-center footer-link">
        <span>¿No tienes una cuenta? </span>
        <Link to="/auth/register"> Crear una cuenta</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;

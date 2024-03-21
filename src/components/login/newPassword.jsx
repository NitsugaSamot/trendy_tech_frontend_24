const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AlertTech from "../alert/alert";
import axios from "axios";
import Nav from "../nav/nav";
import "./forgetPassword.css";
import imageLogo from "../../assets/logo-trendy-negro.png";
import { Button } from "@mui/material";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [passwordModified, setPasswordModified] = useState(false);
  const [confirmationAlert, setConfirmationAlert] = useState(null);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const testToken = async () => {
      try {
        await axios(`${VITE_BACKEND_URL}/users/reset-password/${token}`);
        setValidToken(true);
      } catch (error) {
        showAlert("error", error.response.data.msg);
      }
    };
    testToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* SE RECOMIENDA USAR ESTA VALIDACION EN DESARROLLO PARA NO RENEGAR TANTO CON EL LOGEO  */

    // if (password.length < 6) {
    //   showAlert('error', 'Todos los campos son obligatorios');
    //   return;
    // }

    if (!/(?=.*[a-zA-Z])(?=.*\d).{7,}/.test(password)) {
      showAlert(
        "error",
        "La contraseña debe tener al menos 7 caracteres, incluir al menos una letra y al menos un número."
      );
      return;
    }
    try {
      const url = `${VITE_BACKEND_URL}/users/reset-password/${token}`;

      const { data } = await axios.post(url, { password });
      setPassword("");
      setPasswordModified(true);

      showAlert(
        "success",
        "Su password fue creado correctamente, ya puedes iniciar sesión"
      );
    } catch (error) {
      console.log(error.response.data.error);
      if (error.response && error.response.data && error.response.data.error) {
        // Mostrar la alerta de error
        // showAlert('error', 'Ya hay un registro con este email');
        /* Se supone aqui deberia imprimir el mensaje de alerta del back */
        showAlert("error", error.response.data.error);
      }
    }
  };
  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  const showAlert = (type, message) => {
    // Mostrar la alerta
    setConfirmationAlert({ type, message });

    // Limpiar la alerta después de 3 segundos (3000 ms)
    setTimeout(() => {
      setConfirmationAlert(null);
    }, 3000);
  };

  return (
    <>
      <Nav />
      <div className="divContainer_ResetPassword">
        {confirmationAlert && (
          <AlertTech
            message={confirmationAlert.message}
            type={confirmationAlert.type}
          />
        )}

        {validToken && (
          <form
            action=""
            className="form_ResetPassword"
            onSubmit={handleSubmit}
          >
            <h3 className="h1_ResetPassword">Cambia tu contraseña</h3>
            <div className="div_input_ResetPassword">
              <label className="label" htmlFor="password">
                Nueva contraseña
              </label>
              <div className="div_input_ResetPassword">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="input_ResetPassword"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
              </div>
            </div>

            <div className="columna"></div>

            <input
              type="submit"
              value="Crear nuevo password"
              className="button_form_ResetPassword"
            />
            {passwordModified ? (
              <div className="button_form_ResetPassword">
                <Link className="links_Login_and_reset" to="/home">
                  Inicia Sesión
                </Link>
              </div>
            ) : (
              <Button disabled variant="contained">
                Inicia Sesión
              </Button>
            )}
          </form>
        )}

        <NavLink
          to="/home"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={imageLogo} alt="logo-home" className="logo_footer_login" />
        </NavLink>
      </div>
    </>
  );
};

export default NewPassword;

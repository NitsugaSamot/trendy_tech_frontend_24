const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../nav/nav";
import AlertTech from "../alert/alert";
import imageLogo from "../../assets/logo-trendy-negro.png";
import axios from "axios";
import "./forgetPassword.css"

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [confirmationAlert, setConfirmationAlert] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 400); // Scroll hacia arriba
  }, []);

  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  const handleSubmit = async (e) => {
    console.log("hola");
    e.preventDefault();

    if ([email].includes("")) {
      showAlert("error", "El campo email no puede ir vacío.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${VITE_BACKEND_URL}/users/reset-password`,
        { email }
      );

      showAlert(
        "success",
        "Se ha enviado un email a tu casilla de correo con los pasos a seguir para recuperar tu cuenta"
      );
      setEmail("");
    } catch (error) {
      console.log(error.response.data.msg);
      showAlert("error", error.response.data.msg);
    }
  };

  const showAlert = (type, message) => {
    // Mostrar la alerta
    setConfirmationAlert({ type, message });

    // Limpiar la alerta después de 3 segundos (3000 ms)
    setTimeout(() => {
      setConfirmationAlert(null);
    }, 3000);
  };

  // const { msg } = alert;

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
        <form action="" className="form_ResetPassword" onSubmit={handleSubmit}>
          <h4 className="h1_ResetPassword">
            Recupera el acceso a tu cuenta de TrendyTech
          </h4>

          <div className="div_input_ResetPassword">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="input_ResetPassword"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
            />
            <input
              type="submit"
              value="Enviar instrucciones"
              className="button_form_ResetPassword"
            />
          </div>

          <nav className="nav_Login_reset">
            <Link className="links_Login_and_reset" to="/home">
              ¿Tienes una cuenta? Inicia Sesión
            </Link>
            <Link className="links_Login_and_reset" to="/register">
              ¿No tienes una cuenta? Registrate
            </Link>
          </nav>
        </form>
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

export default ForgetPassword;

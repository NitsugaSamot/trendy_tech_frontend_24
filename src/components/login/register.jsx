const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Nav from "../nav/nav";
import AlertTech from "../alert/alert";
import imageLogo from "../../assets/logo-trendy-negro.png";
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [confirmationAlert, setConfirmationAlert] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 400); // Scroll hacia arriba
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repetirPassword].includes("")) {
      showAlert("error", "Todos los campos son obligatorios");
      return;
    }

    if (password !== repetirPassword) {
      showAlert("error", "Los passwords no coinciden amigo(a)");
      return;
    }

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
      const { data } = await axios.post(`${VITE_BACKEND_URL}/users`, {
        name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");

      // alerta de confirmación
      showAlert(
        "success",
        "Se ha enviado un email a tu casilla de correo para que confirmes tu cuenta"
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

  const showAlert = (type, message) => {
    // Mostrar la alerta
    setConfirmationAlert({ type, message });

    // Limpiar la alerta después de 3 segundos (3000 ms)
    setTimeout(() => {
      setConfirmationAlert(null);
    }, 3000);
  };

  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  return (
    <>
      <Nav />
      <div className="divContainer_Register">
        {confirmationAlert && (
          <AlertTech
            message={confirmationAlert.message}
            type={confirmationAlert.type}
          />
        )}

        <form action="" className="form_Register" onSubmit={handleSubmit}>
          <h3 className="h1_Register">Regístrate</h3>
          <div>
            <div className="div_input_Register">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Tu name"
                className="input_Register"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
              />
            </div>

            <div className="div_input_Register">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="input_Register"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
            </div>

            <div className="div_input_Register">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input_Register"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
            </div>

            <div className="div_input_Register">
              <label htmlFor="password">Repetir Password</label>
              <input
                id="password2"
                type="password"
                placeholder="Repetir tu Password"
                className="input_Register"
                value={repetirPassword}
                onChange={(e) => handleInputChange(e, setRepetirPassword)}
              />
            </div>
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="button_form_Register"
          />
          <nav className="nav_Login_reset">
            <Link to="/home" className="links_Login_and_reset">
              ¿Tienes una cuenta? Inicia Sesión
            </Link>
            <Link to="/reset-password" className="links_Login_and_reset">
              Olvidé Mi Password
            </Link>
          </nav>
        </form>
        <NavLink to="/home">
          <img src={imageLogo} alt="logo-home" className="logo_footer_login" />
        </NavLink>
      </div>
    </>
  );
};

export default Register;

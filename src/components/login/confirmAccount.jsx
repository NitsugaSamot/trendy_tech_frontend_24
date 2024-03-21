const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import AlertTech from "../alert/alert";
import imageLogo from "../../assets/fondo-trendytech-confirm-2.png";
import "./confirmAccount.css";

const ConfirmAccount = () => {
  const [accountConfirmated, setAccountConfirmated] = useState(false);
  const [confirmationAlert, setConfirmationAlert] = useState(null);

  const params = useParams();
  const { id } = params; //desestructuramos extrayendo id de params

  useEffect(() => {
    const ConfirmAccount = async () => {
      try {
        const url = `${VITE_BACKEND_URL}/users/confirm/${id}`;
        const { data } = await axios.post(url);

        setAccountConfirmated(true);

        showAlert(
          "success",
          "Tu cuenta ha sido confirmada, ya puedes iniciar sesión"
        );
      } catch (error) {
        showAlert("error", "Token no válido");
      }
    };
    ConfirmAccount();
  }, []);

  const showAlert = (type, message) => {
    // Mostrar la alerta
    setConfirmationAlert({ type, message });

    // Limpiar la alerta después de 3 segundos (3000 ms)
    setTimeout(() => {
      setConfirmationAlert(null);
    }, 3000);
  };

  return (
    <div className="divContainer_confirm">
      <img
        className="bg_image_confirmAccount"
        src="https://res.cloudinary.com/dntrwijx5/image/upload/v1695222841/imagenes/zyyrjmno1js0hsjcowkr.png"
        alt=""
      />
      <div className="divsub">
        {confirmationAlert && (
          <AlertTech
            message={confirmationAlert.message}
            type={confirmationAlert.type}
          />
        )}
        <div className="div_logo_confirm">
          <NavLink to="/home">
            <img src={imageLogo} alt="logo-home" className="logoRegister" />
          </NavLink>
        </div>
        <div className="h2_confirmAccount">
          <h2>Estas confirmado!</h2>
        </div>
        {accountConfirmated && (
          <NavLink to="/home" className="navLink_confirm">
            <button className="button_confirm">Ir al home</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ConfirmAccount;

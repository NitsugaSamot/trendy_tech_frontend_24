import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"; // Importa la biblioteca js-cookie
import chromeImgLogin from "../../assets/chrome.png";
import "./auth0Login.css";

const LoginButton = () => {
  const userData = useSelector((state) => state.userData);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleLogout = () => {
    // Elimina la cookie cuando el usuario cierra la sesión
    Cookies.remove("ignacioMagic"); // Reemplaza "ignacioMagic" con el nombre de tu cookie

    // Luego, llama a logout para cerrar la sesión
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      {!userData.name ? (
        <div>
          <img
            src={chromeImgLogin}
            onClick={handleLogin}
            className="img_login_google"
          />
        </div>
      ) : (
        <Button onClick={handleLogout} style={{ marginTop: "15px" }}>
          Cerrar Sesión
        </Button>
      )}
    </div>
  );
};

export default LoginButton;

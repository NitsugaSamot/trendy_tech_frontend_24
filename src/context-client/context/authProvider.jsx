const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

/* AuthProvider rodea a toda la aplicacion */
const AuthProvider = ({ children }) => {
  // const [auth, setAuth] = useState({})
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "", // Inicializa con el token almacenado
  });
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  /* Se ejecuta una sola vez , ya que solo comprueba que haya un token para autenticar al usuario */
  useEffect(() => {
    const authenticateUser = async () => {
      /* leer el token */
      const token = localStorage.getItem("token");
      console.log(token)  //si rompe hay que descomentar

      //Si no hay token detenemos la ejecucion del codigo
      if (!token) {
        setCargando(false);
        return;
      }

      /* headers es un objeto */
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(config);
      try {
        const { data } = await axios.get(
          `${VITE_BACKEND_URL}/users/profile`,
          config
        );
        console.log(data);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setCargando(false);
      }
    };
    authenticateUser();
  }, []);

  const closeSession = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        closeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;

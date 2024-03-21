const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useAuth from "../../context-client/hooks/useAuth";
import axios from "axios";
import "./userForUser.css";
import { Edit as EditIcon } from "@mui/icons-material";
import Nav from "../../components/nav/nav";
import Footer from "../footer/footer";
import FormDialog from "../../components/openForm/openForm";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { getuserData, setAlert } from "../../redux/actions";
import Cards from "../../components/cards/cards";
import { Button, Collapse } from "@mui/material";
import Purchases from "../../components/purchases/purchases";
import imageLogo from "../../assets/logo-trendy-negro.png";

const UserForUser = () => {
  const { auth, setAuth } = useAuth();
  const dataUser = useSelector((state) => state.userData);
  const { user } = useAuth0();
  const [userData, setUserData] = useState({}); //-------si algo tira error probar con null--------
  const [showEdit, setShowEdit] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);

  //*-----------Favoritos----------------
  const favoriteProducts = useSelector((state) => state.favoriteProducts);
  const [showFavorites, setFavarites] = useState(false);

  const toggleFavorites = () => {
    setFavarites(!showFavorites);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      let emailToSend;
      if (auth && auth.email) {
        emailToSend = auth.email;
      } else if (user && user.email) {
        emailToSend = user.email;
      }

      if (emailToSend) {
        try {
          const result = await axios.get(
            `${VITE_BACKEND_URL}/users/email/${emailToSend}`
          );
          setUserData(result.data);
        } catch (error) {
          console.error("Error al obtener datos del usuario", error);
        }
      }
    };

    fetchData();
  }, [auth, user, userUpdated, imageUpdated]);

  const handleEditName = () => {
    setShowEdit(true);
  };
  const onClose = () => {
    setShowEdit(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "trendyImg");

      try {
        // Primer solicitud: Subir imagen a Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dntrwijx5/image/upload",
          { method: "POST", body: data }
        );
        const res = await response.json();

        if (res.secure_url) {
          const emailToSend =
            auth && auth.email
              ? auth.email
              : user && user.email
              ? user.email
              : null;

          if (emailToSend) {
            try {
              // Segunda solicitud: Enviar la URL de la imagen a tu backend junto con el email
              const backendResponse = await axios.put(
                `${VITE_BACKEND_URL}/users/editimage`,
                {
                  email: emailToSend,
                  newImage: res.secure_url,
                }
              );
              console.log(backendResponse);
              if (auth && auth.id) {
                setAuth(backendResponse.data);
              }
              if (dataUser && dataUser.id) {
                dispatch(getuserData(backendResponse.data));
              }
              setImageUpdated(!imageUpdated);
              dispatch(setAlert("La imagen se cambio con exito", "success"));
              //---------actualizar imagen en el modal-----------//
              // Manejar la respuesta de tu backend si es necesario
            } catch (backendError) {
              console.error("Error sending data to backend:", backendError);
            }
          } else {
            console.error("No email available for sending to backend");
          }
        } else {
          console.error("Failed to upload image to Cloudinary");
        }
      } catch (cloudinaryError) {
        console.error("Error uploading to Cloudinary:", cloudinaryError);
      }
    }
  };

  return (
    <div>
      <Nav />
      <div className="container">
        <div className="userContainer">
          <h2>Edita tu perfil</h2>
          <div className="imageContainer">
            <img
              src={userData.image || imageLogo}
              alt={userData.name}
              className="userImage"
            />
            <div className="editIconOverlay">
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="image-input"
                onChange={handleFileChange}
              />
              <Tooltip title="Presiona y selecciona una nueva imagen!" arrow>
                <label htmlFor="image-input">
                  <EditIcon fontSize="small" color="primary" />
                </label>
              </Tooltip>
            </div>
          </div>
          <div className="userName">
            <h2>{userData.name}</h2>
            <Tooltip title="Presiona para cambiar el nombre!" arrow>
              <EditIcon
                fontSize="small"
                color="primary"
                onClick={handleEditName}
              />
            </Tooltip>
          </div>
          <h3>{userData.email}</h3>
        </div>
        <h2>Tus Favoritos</h2>
        <Button onClick={toggleFavorites}>
          {showFavorites ? "Ocultar Favoritos" : "Mostrar Favoritos"}
        </Button>
        <Collapse in={showFavorites} sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <Cards currentProduct={favoriteProducts} auth={auth} />
        </Collapse>
        <FormDialog
          onClose={onClose}
          showEdit={showEdit}
          userData={userData}
          onUserUpdate={() => setUserUpdated(!userUpdated)}
        />
        <Purchases/>
        <Footer />
      </div>
    </div>
  );
};

export default UserForUser;

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertTech from "../alert/alert";
import { getuserData, setAlert } from "../../redux/actions";
import useAuth from "../../context-client/hooks/useAuth";

export default function FormDialog({
  onClose,
  showEdit,
  userData,
  onUserUpdate,
}) {
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const [user, setUserData] = useState({});

  useEffect(() => {
    setUserData({ email: userData.email, newName: userData.name });
  }, [userData]);

  const handleNameChange = (event) => {
    setUserData((prevUser) => ({
      ...prevUser,
      newName: event.target.value,
    }));
  };

  const { setAuth, auth } = useAuth();
  const dataUser = useSelector((state) => state.userData);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${VITE_BACKEND_URL}/users/editname`,
        user
      );
      if (response.status >= 200 && response.status < 400) {
        console.log("el nombre se cambio");
      }

      console.log("auth", auth);
      console.log("dataUser", dataUser);

      if (auth && auth.id) {
        setAuth(response.data);
      }
      if (dataUser && dataUser.id) {
        dispatch(getuserData(response.data));
      }

      dispatch(setAlert("El nombre fue cambiado con exito", "success"));
      onUserUpdate();
      onClose();
    } catch (error) {
      console.error("Error al cambiar el nombre del usuario", error);
    }
  };

  return (
    <div>
      {alertState.visible && (
        <AlertTech message={alertState.message} type={alertState.type} />
      )}
      <Dialog open={showEdit} onClose={onClose}>
        <DialogTitle>Editar nombre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escribe el nuevo nombre y dale al "Editar"
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nuevo nombre:"
            type="text" // Debería ser "text", no "email"
            value={user.newName}
            onChange={handleNameChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Editar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

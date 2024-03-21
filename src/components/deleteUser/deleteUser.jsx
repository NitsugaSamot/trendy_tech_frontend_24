import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);

  const handleDelete = async (event) => {
    try {
      const deleteToggle = await axios.put(`${VITE_BACKEND_URL}/users/delete`, {
        userId: event.target.value,
      });
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/users`);
        const { data } = response;
        setUsers(data.sort((a, b) => a.id - b.id)); // Sort users by ID
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [update]);

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell style={{ width: "250px" }}>Nombre</TableCell>
            <TableCell style={{ width: "250px" }}>Email</TableCell>
            <TableCell style={{ width: "250px" }}>Estado</TableCell>
            <TableCell style={{ width: "250px" }}>Confirmación</TableCell>
            <TableCell style={{ width: "150px" }}>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor:
                  index % 3 === 0
                    ? "#f5f5f5"
                    : index % 3 === 1
                    ? "#e0e0e0"
                    : "#c2c2c2",
              }}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isDeleted ? (
                  <Typography color="error">Eliminado</Typography>
                ) : (
                  <Typography color="success">Activo</Typography>
                )}
              </TableCell>
              <TableCell>
                {user.confirmated ? (
                  <Typography color="success">Confirmado</Typography>
                ) : (
                  <Typography color="error">No confirmado</Typography>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={user.isDeleted ? "success" : "error"}
                  value={user.id}
                  onClick={handleDelete}
                  style={{
                    transition: "background-color 0.3s",
                    width: "150px",
                  }}
                >
                  {user.isDeleted ? "Activar" : "Desactivar"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeleteUser;

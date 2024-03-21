// import DeleteUser from "../deleteUser/deleteUser";
import DeleteProduct from "../../components/deleteProduct/deleteProduct";
import DeleteUser from "../../components/deleteUser/deleteUser";
import { Button, Container } from "@mui/material";
import Nav from "../../components/nav/nav";
import { useState } from "react";
import "./delete.css";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import ComputerIcon from "@mui/icons-material/Computer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const Delete = () => {
  const [selectedList, setSelectedList] = useState(null);

  const handleOption = (event) => {
    const { value } = event.target;
    if (value === "volver") setSelectedList("");
    if (value === "users") setSelectedList("users");
    if (value === "products") setSelectedList("products");
  };

  return (
    <div>
      <Nav />
      <Container className="containerDelete">
        {selectedList ? (
          (selectedList === "users" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                value="volver"
                onClick={handleOption}
                variant="contained"
                sx={{ margin: "10px", marginRight: "90%" }}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Volver
              </Button>
              <DeleteUser />
            </div>
          )) ||
          (selectedList === "products" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                value="volver"
                onClick={handleOption}
                variant="contained"
                startIcon={<KeyboardBackspaceIcon />}
                sx={{ margin: "10px", marginRight: "90%" }}
              >
                Volver
              </Button>
              <DeleteProduct />
            </div>
          ))
        ) : (
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Button
              value="users"
              onClick={handleOption}
              variant="contained"
              color="error"
              sx={{ marginTop: "100px" }}
              endIcon={<GroupRemoveIcon />}
            >
              Usuarios
            </Button>
            <Button
              value="products"
              onClick={handleOption}
              color="error"
              variant="contained"
              sx={{ marginTop: "100px" }}
              endIcon={<ComputerIcon />}
            >
              Productos
            </Button>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default Delete;

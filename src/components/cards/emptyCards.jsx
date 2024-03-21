import { Container, Box } from "@mui/system";
import iconoCarrito from "../../assets/online-shopping (1).png";
export default function Empty() {
  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          backgroundColor: "white",
          width: "400%",
          height: "300px",
          borderRadius: "5px",
          boxShadow: "0px 0px 3px 0.01px rgba(0, 0, 0, 0.14)",
        }}
      >
        <img
          src={iconoCarrito}
          alt="carrito vacio"
          className="empty-cart-icon"
        />
        <h4>Lo siento! Ningún producto cumple los criterios de búsqueda.</h4>
      </Box>
  );
}

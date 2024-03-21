import React from "react";
import LinkedInProfile from "./linkedInProfile";
import Footer from "../footer/footer";
import NavBar from "../../components/nav/nav";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const styles = {
  container: {
    textAlign: "center",
    padding: "16px", // Puedes ajustar esto según tus preferencias
    fontfamily: '"Poppins", sans-serif',
  },

  logo: {
    maxWidth: "100%",
    marginBottom: "16px", // Puedes ajustar esto según tus preferencias
  },
  title: {
    fontSize: "30px",
    marginBottom: "16px", // Puedes ajustar esto según tus preferencias
  },
  paper: {
    padding: "16px", // Puedes ajustar esto según tus preferencias
  },
  text: { fontSize: "25px" },
  textAlign: "justify",
};

const AboutUs = () => {
  return (
    <div>
      <NavBar />
      <div style={{ margin: "30px" }}>
        <div className="linkedin-profiles">
          <LinkedInProfile />
        </div>
        <div style={styles.container}>
          <Typography variant="h1" style={styles.title}>
            Sobre Nosotros
          </Typography>
          <Paper style={styles.paper}>
            <List>
              <ListItem>
                <ListItemText
                  primary="TrendyTech surge con el objetivo de brindar comodidad a nuestros clientes, que ven la necesidad de realizar sus compras sin tener que desplazarse a una tienda física. Pero no nos quedamos ahí, nosotros les ofrecemos a nuestros clientes una atención personalizada, brindando la asesoría necesaria, con el fin de que realicen sus compras de la manera más cómoda y que satisfagan sus necesidades. Desde sus inicios como tienda especializada en venta de productos electrónicos, nos hemos enfocado en la prestación de un excelente servicio al cliente, un manejo de precios competitivos y estar a la vanguardia con los productos más innovadores del mercado. Todos los productos que comercializamos en nuestra tienda tienen la garantía y el respaldo de sus fabricantes, además les garantizamos su originalidad. "
                  style={styles.text}
                />
              </ListItem>
            </List>
          </Paper>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

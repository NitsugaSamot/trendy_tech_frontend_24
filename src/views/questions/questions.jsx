import { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./questions.css";
import Footer from "../footer/footer";
import NavBar from "../../components/nav/nav";

const FrequentQuestions = () => {
  const questionsAndAnswers = [
    {
      question: "¿Cómo puedo crear mi cuenta?",
      answer:
        "Si estás en una laptop u ordenador ve a la parte superior derecha y " +
        "busca la opción ‘Iniciar sesión’. Si estás en un celular, ve a la " +
        "parte superior y busca el icono de ‘perfil’ junto a los iconos de " +
        "buscador y carrito.",
    },
    {
      question: "Olvidé mi contraseña ¿Qué puedo hacer?",
      answer:
        "Para recuperar tu contraseña, sigue los mismos pasos de la respuesta " +
        "anterior y luego busca el enlace ‘¿Olvidaste tu contraseña?’. Sigue " +
        "los pasos para restablecer tu contraseña y podrás seguir navegando.",
    },
    {
      question:
        "Tengo problemas para realizar mi compra online ¿Qué puedo hacer?",
      answer:
        "Nuestra tienda TrendTech es compatible con todos los dispositivos y " +
        "navegadores. Te sugerimos intentar refrescar tu navegador y borrar " +
        "el caché e intentar nuevamente realizar tu orden. Si esto aún no " +
        "funciona, por favor, comunícate con nosotros a trendytechdev@gmail.com.",
    },
    {
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer: "Aceptamos pagos con tarjeta de crédito, débito.",
    },
    {
      question: "¿Qué pasa si el pedido no llega dentro del tiempo solicitado?",
      answer:
        "Si tienes algún problema con tu pedido puedes comunicarte al " +
        "siguiente correo electrónico: trendytechdev@gmail.com. El horario de " +
        "atención es de lunes a viernes de 9 a.m. a 6 p.m.",
    },
  ];
  const [expanded, setExpanded] = useState(null);

  const handleExpand = (index) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <div className="center-content">
          <Paper
            elevation={3}
            className="preguntas-frecuentes"
            id="preguntas-frecuentes">
            <Typography
              variant="h4"
              style={{ marginBottom: "20px", color: "black" }}>
              Preguntas Frecuentes
            </Typography>
            <List>
              {questionsAndAnswers.map((item, index) => (
                <div key={index}>
                  <ListItem button onClick={() => handleExpand(index)}>
                    <ListItemText
                      primary={
                        <span className="question-text">{item.question}</span>
                      }
                      style={{ cursor: "pointer" }}
                    />
                    {expanded === index ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItem>
                  <Collapse
                    in={expanded === index}
                    timeout="auto"
                    unmountOnExit>
                    <Typography variant="body1">{item.answer}</Typography>
                  </Collapse>
                </div>
              ))}
            </List>
          </Paper>
        </div>
        <div style={{ marginBottom: "20px" }}></div>
        <Footer />
      </div>
    </div>
  );
};

export default FrequentQuestions;

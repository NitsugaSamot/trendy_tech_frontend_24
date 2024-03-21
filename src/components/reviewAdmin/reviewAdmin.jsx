import axios from "axios";
import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Nav from "../../components/nav/nav";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ReviewAdmin = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`${VITE_BACKEND_URL}/users/getreviews`);
        setAllReviews(response.data);
        setRefresh(false);
      } catch (error) {
        console.error("Error al obtener reviews", error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleSetReview = async (event) => {
    try {
      const res = await axios.post(`${VITE_BACKEND_URL}/users/showreview`, {
        reviewId: event.target.value,
      });
      setAllReviews(res.data);
      setRefresh(true);
    } catch (error) {
      console.error("error al updatear booleano isVisible", error);
    }
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>Reseñas de Usuarios</h1>
        <div style={{ width: "70%", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "5%" }}>ID</TableCell>
                  <TableCell style={{ width: "7%" }} align="right">
                    Usuario ID
                  </TableCell>
                  <TableCell style={{ width: "7%" }} align="right">
                    Producto ID
                  </TableCell>
                  <TableCell style={{ width: "5%" }} align="right">
                    Puntuación
                  </TableCell>
                  <TableCell align="right">Fecha</TableCell>
                  <TableCell style={{ width: "30%" }} align="right">
                    Comentario
                  </TableCell>
                  <TableCell align="right">Visibilidad</TableCell>
                  <TableCell align="right">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(allReviews) &&
                  allReviews.length > 0 &&
                  allReviews
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((review) => (
                      <TableRow key={review.id}>
                        <TableCell component="th" scope="row">
                          {review.id}
                        </TableCell>
                        <TableCell align="right">{review.userId}</TableCell>
                        <TableCell align="right">{review.productId}</TableCell>
                        <TableCell align="right">
                          {review.punctuation}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">{review.text}</TableCell>
                        <TableCell align="right">
                          {String(review.isVisible)}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color={review.isVisible ? "secondary" : "primary"}
                            onClick={handleSetReview}
                            value={review.id}
                            style={{ width: "100px" }} // Fijamos un ancho para evitar el cambio de diseño.
                          >
                            {review.isVisible ? "Ocultar" : "Mostrar"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ReviewAdmin;

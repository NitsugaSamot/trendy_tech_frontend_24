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
import { toFormatPrice } from "../../helpers/toFormatPrice";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async (event) => {
    try {
      dispatch(getAllProducts());
      const deleteToggle = await axios.put(
        `${VITE_BACKEND_URL}/products/delete`,
        { productId: event.target.value }
      );
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/products`);
        const { data } = response;
        setProducts(data.sort((a, b) => a.id - b.id)); // aca va el ordenamiento
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
            <TableCell>Producto</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell style={{ width: "150px" }}>Estado</TableCell>
            <TableCell style={{ width: "150px" }}>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => {
            const price = toFormatPrice(product.price);
            return (
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
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>
                  {product.isDeleted ? (
                    <Typography color="error">Eliminado</Typography>
                  ) : (
                    <Typography color="success">Activo</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={product.isDeleted ? "success" : "error"}
                    value={product.id}
                    onClick={handleDelete}
                    style={{ transition: "background-color 0.3s" }}
                  >
                    {product.isDeleted ? "Agregar" : "Borrar"}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeleteProduct;

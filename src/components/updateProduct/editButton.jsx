import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import validationForm from "./validationUpdate";
import AlertTech from "../alert/alert";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Loader from "../loader/loader";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import "./editButton.css";

const EditButton = ({ product, updatePage }) => {
  const [open, setOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    ...product,
    name: product.name,
    price: product.price,
    discount: product.discount,
    images: [],
    description: product.description,
    stock: product.stock,
    brand: product.brand,
    color: product.color,
    type: product.type,
  });
  const [formErrors, setFormErrors] = useState({});
  const [confirmationAlert, setConfirmationAlert] = useState(null);
  const [imageCloudinary, setImageCloudinary] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const showAlert = (type, message) => {
    setConfirmationAlert({ type, message });

    setTimeout(() => {
      setConfirmationAlert(null);
    }, 5000);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageCloudinary([]);
    setFormErrors({});
  };

  const handleChangeImg = async (event) => {
    if (imageCloudinary.length >= 3) {
      setFormErrors({ images: "Ya has alcanzado el límite de 3 imágenes." });
      return;
    }
    if (imageCloudinary.length + event.target.files.length > 3) {
      setFormErrors({
        images: "Has excedido el límite de 3 imágenes. Intentalo de nuevo",
      });
      return;
    }
    setLoadingImages(true);
    const files = event.target.files;
    const imagesArray = Array.from(files);
    const uploadImage = [];
    const uploadPromises = imagesArray.map(async (img) => {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "trendyImg");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dntrwijx5/image/upload",
          data
        );
        uploadImage.push(response.data.secure_url);
      } catch (error) {
        console.log(error);
      }
    });
    await Promise.all(uploadPromises);

    const combinedImages = [...imageCloudinary, ...uploadImage];

    // Limitar a un máximo de 3 imágenes
    if (combinedImages.length <= 3 || editedProduct.images <= 3) {
      setImageCloudinary(combinedImages);
      setEditedProduct({
        ...editedProduct,
        images: combinedImages,
      });
    }
    setLoadingImages(false);
  };

  const handleSave = async () => {
    const errors = validationForm(editedProduct);

    // Verificar si hay errores
    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
    } else if (imageCloudinary.length === 0) {
      editedProduct.images = product.images;
    }
    // Si no hay errores, enviar la solicitud al servidor
    try {
      const response = await axios.put(
        `${VITE_BACKEND_URL}/products/update`,
        editedProduct
      );
      const { data } = response;
      updatePage(data);
      setFormErrors({});
      setOpen(false);
      setConfirmationAlert(true);
      showAlert("success", "Tu producto fue actualizado con éxito");
      setImageCloudinary([]);
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "stock" || name === "discount") {
      if (!isNaN(value)) {
        setEditedProduct({
          ...editedProduct,
          [name]: Number(value),
        });
      }
    } else if (
      name === "name" ||
      name === "brand" ||
      name === "color" ||
      name === "type" ||
      name === "description"
    ) {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setEditedProduct({ ...editedProduct, [name]: capitalizedValue });
    } else {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  return (
    <div>
      {confirmationAlert && (
        <AlertTech
          message={confirmationAlert.message}
          type={confirmationAlert.type}
        />
      )}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Editar Producto</DialogTitle>

        <DialogContent>
          <hr
            style={{ backgroundColor: "#fc6933", width: "90%", height: "3px" }}
          />
          <TextField
            label="Nombre"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Precio"
            name="price"
            value={editedProduct.price}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.price}
            helperText={formErrors.price}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Descuento"
            name="discount"
            value={editedProduct.discount}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.discount}
            helperText={formErrors.discount}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Stock"
            name="stock"
            value={editedProduct.stock}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
            error={!!formErrors.stock}
            helperText={formErrors.stock}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Marca"
            name="brand"
            value={editedProduct.brand}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.brand}
            helperText={formErrors.brand}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Tipo"
            name="type"
            value={editedProduct.type}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.type}
            helperText={formErrors.type}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Color"
            name="color"
            value={editedProduct.color}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.color}
            helperText={formErrors.color}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "80%", height: "2px" }}
          />
          <TextField
            label="Descripción"
            name="description"
            value={editedProduct.description}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            error={!!formErrors.description}
            helperText={formErrors.description}
          />
          <hr
            style={{ backgroundColor: "#fc6933", width: "90%", height: "3px" }}
          />
          <Typography variant="body2" color="textSecondary">
            Puedes subir hasta 3 imágenes.
          </Typography>
          <Typography variant="body2" style={{ color: "red" }}>
            {formErrors.images}
          </Typography>
          <label htmlFor="file-upload" className="custom-file-upload">
            Cambiar imágenes
          </label>

          <input
            id="file-upload"
            type="file"
            className="input-file"
            multiple
            accept="image/*"
            onChange={handleChangeImg}
          />
          <ImageList
            sx={{
              width: 830,
              height: 320,
              display: "flex",
              justifyContent: "center",
            }}
            cols={3}
            rowHeight={164}
          >
            {imageCloudinary.length > 0
              ? imageCloudinary.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      alt={item}
                      style={{ width: "250px", backgroundColor: "#AAB9CF" }}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              : product.images?.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item}?w=164&h=164&fit=crop&auto=format`}
                      alt={item}
                      style={{ width: "250px" }}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
          </ImageList>
          {loadingImages && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Backdrop open={true}>
                <Loader />
              </Backdrop>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditButton;

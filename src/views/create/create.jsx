const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/nav/nav.jsx";
import validation from "./validation.js";
import Footer from "../footer/footer.jsx";
import axios from "axios";
import styles from "./create.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions";
import AlertTech from "../../components/alert/alert";

const Create = () => {
  const alertState = useSelector((state) => state.alert);
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [imageCloudinary, setImageCloudinary] = useState([]);
  const [imageError, setImageError] = useState({});
  // const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    images: [],
    description: "",
    stock: 0,
    discount: 0,
    brand: "",
    color: "",
    type: "",
  });

  useEffect(() => {}, [form, error]);
  useEffect(() => {}, [imageCloudinary]);
  // HANDLERS
  const handleChange = (event) => {
    if (
      event.target.name == "price" ||
      event.target.name == "stock" ||
      event.target.name == "discount"
    ) {
      if (!isNaN(event.target.value)) {
        setForm({
          ...form,
          [event.target.name]: Number(event.target.value),
        });
      }
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }

    const errores = validation(form);
    setError(errores);
  };

  const dispatch = useDispatch();

  const handleChangeImg = async (event) => {
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

    // Limitar a un máximo de 3 imágenes
    if (uploadImage.length <= 3 || imagesArray.length <= 3) {
      setImageCloudinary(uploadImage);
      if (form.images.length >= 3) {
        setForm({
          ...form,
        });
      } else {
        setForm({
          ...form,
          images: [...form.images, ...uploadImage],
        });
      }
      const errores = validation(form, imagesArray);
      setError(errores);
    } else {
      error.alert =
        "No puedes agregar más de 3 imágenes.Vuelve a cargar las imagenes";
      setForm({ ...form, images: [] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      error.name.length > 0 ||
      error.price.length > 0 ||
      error.description.length > 0 ||
      error.stock.length > 0 ||
      error.discount.length > 0 ||
      error.brand.length > 0 ||
      error.color.length > 0 ||
      error.type.length > 0 ||
      error.images.length > 0 ||
      error.imageFiles.length > 0
    ) {
      return setError({
        ...error,
        submit: "Hay errores en el formulario",
      });
    } else {
      // posteo al backend
      const response = await axios.post(
        `${VITE_BACKEND_URL}/products/create`,
        form
      );
      const { data } = response;
      navigate(`/detail/${data.id}`);
    }
  };

  const handleDeleteImg = (event) => {
    const { src, alt } = event.target;

    const result = form.images.filter((image) => {
      return image !== src;
    });
    // console.log(result);
    setForm({ ...form, images: result });
    dispatch(setAlert(`Ha eliminado la imagen ${alt}`, "warning"));
  };

  return (
    <div className={styles.divcontainer}>
      <Nav />
      {alertState.visible && (
        <AlertTech message={alertState.message} type={alertState.type} />
      )}
      <div className={styles.title_container}>
        <h1>Crear un producto</h1>
      </div>

      <div className={styles.divcontainer_form_formimage}>
        <form onSubmit={handleSubmit} className={styles.divcontainer_form}>
          {error.submit && <p className={styles.error}>{error.submit}</p>}
          {/* NOMBRE  */}
          <div className={styles.divlabel_input_create}>
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength="100"
              className={styles.input_create}
            />
            {error.name && <p className={styles.error}>{error.name}</p>}
          </div>

          <div className={styles.div_precio_stock}>
            {/* PRECIO */}
            <div className={styles.divlabel_input_create}>
              <label>Precio</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className={styles.input_create_num}
              />
              {error.price && <p className={styles.error}>{error.price}</p>}
            </div>

            {/* STOCK */}
            <div className={styles.divlabel_input_create}>
              <label>Cantidad</label>
              <input
                type="text"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className={styles.input_create_num}
              />
              {error.stock && <p className={styles.error}>{error.stock}</p>}
            </div>
          </div>
          {/* DESCUENTO */}
          <div className={styles.divlabel_input_create}>
            <label>Descuento a aplicar:</label>
            <input
              maxLength="2"
              type="text"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className={styles.input_create}
            />
            {error.discount && <p className={styles.error}>{error.discount}</p>}
          </div>
          {/* DESCRIPCION */}
          <div className={styles.divlabel_input_create}>
            <label>Descripción</label>
            <textarea
              maxLength="500"
              id="comentario"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={styles.textarea_create}
              placeholder="Describe tu producto."
            ></textarea>
            {error.description && (
              <p className={styles.error}>{error.description}</p>
            )}
          </div>

          {/* BRAND */}
          <div className={styles.divlabel_input_create}>
            <label>Marca</label>
            <input
              maxLength="20"
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className={styles.input_create}
            />
            {error.brand && <p className={styles.error}>{error.brand}</p>}
          </div>
          {/* TYPE */}
          <div className={styles.divlabel_input_create}>
            <label>Categoría</label>
            <input
              maxLength="20"
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className={styles.input_create}
            />
            {error.type && <p className={styles.error}>{error.type}</p>}
          </div>
          {/* COLOR */}
          <div className={styles.divlabel_input_create}>
            <label>Color</label>
            <input
              maxLength="20"
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              className={styles.input_create}
            />
            {error.color && <p className={styles.error}>{error.color}</p>}
          </div>
          {/* IMAGENES */}
          <div className={styles.divlabel_input_create_img_btn}>
            <div className={styles.divlabel_input_create}>
              <label>Imagen</label>
              <input
                type="file"
                name="image"
                multiple
                accept="image/*"
                onChange={handleChangeImg}
                className={styles.input_create_files}
              />
              <div className={styles.error_images_container}>
                {Array.isArray(error.images) &&
                  error.images.map((img, index) => (
                    <span className={styles.error} key={index}>
                      {img}
                    </span>
                  ))}
                {Array.isArray(error.imageFiles) &&
                  error.imageFiles.map((img, index) => (
                    <span className={styles.error} key={index}>
                      {img}
                    </span>
                  ))}
              </div>
            </div>

            {!error.name &&
            !error.price &&
            !error.description &&
            !error.stock &&
            !error.discount &&
            !error.brand &&
            !error.color &&
            !error.type &&
            !error.images &&
            !error.imageFiles ? (
              <button type="submit" className={styles.buttonsubmit_create}>
                Enviar
              </button>
            ) : (
              <button
                type="submit"
                className={styles.buttonsubmit_create_disabled}
                disabled
              >
                Enviar
              </button>
            )}
          </div>
        </form>
        <div className={styles.divcontainer_images_form}>
          <h2 className={styles.title_images}>Imagenes seleccionadas</h2>
          <div className={styles.images_container}>
            {form.images[0] ? (
              <img
                src={form.images[0]}
                onClick={handleDeleteImg}
                alt="Principal"
                loading="lazy"
                className={styles.image}
              />
            ) : (
              <span className={styles.imagen_ph}>Imagen Principal</span>
            )}
          </div>
          <div className={styles.images_container}>
            {form.images[1] ? (
              <img
                src={form.images[1]}
                onClick={handleDeleteImg}
                alt="Secundaria"
                loading="lazy"
                className={styles.image}
              />
            ) : (
              <span className={styles.imagen_ph}>Imagen Secundaria</span>
            )}
          </div>
          <div className={styles.images_container}>
            {form.images[2] ? (
              <img
                src={form.images[2]}
                onClick={handleDeleteImg}
                alt="Extra"
                loading="lazy"
                className={styles.image}
              />
            ) : (
              <span className={styles.imagen_ph}>Imagen Extra</span>
            )}
          </div>
          <h4 style={{color: 'orangered', backgroundColor: 'white', borderRadius: '5px', padding: '5px' }}>*Elimina clickeando la imagen*</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Create;

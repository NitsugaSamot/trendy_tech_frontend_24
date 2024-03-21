const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import Nav from "../../components/nav/nav";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import "./detail.css";
import { addToCart } from "../../redux/actions";
import Loader from "../../components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions"; //---------> para el setAlert
import AlertTech from "../../components/alert/alert";
import Footer from "../footer/footer";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import DetailCarousel from "./carrusel";
import { toFormatPrice } from "../../helpers/toFormatPrice";
import Stars from "../../components/stars/stars";
import ReviewsDetail from "../../components/reviewsDetail/reviewsDetail";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../context-client/hooks/useAuth";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imagePP, setImagePP] = useState();
  const [loading, setLoading] = useState(true);
  const shoppingCart = useSelector(state => state.shoppingCart);
  const [revData, setRevData] = useState([]);
  const [userData, setUserData] = useState([])
  const isProductInCart = shoppingCart.some((product) => product.id === id);

  /* ---------para usar el alert------------- */
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData);
  const { auth } = useAuth();
  const [userId, setUserId] = useState(false);

  const identifyUser = () => {
    let userAux;
    if (auth && auth.id) {
      userAux = auth.id;
    } else if (user && user.id) {
      userAux = user.id;
    }
    if (userAux) {
      try {
        setUserId(userAux);
      } catch (error) {
        console.error("Error al obtener datos del usuario", error);
      }
    }
  };

  useEffect(() => {
    if (!userId) {
      identifyUser();
    }
    console.log("hay cliente", user);
  }, [auth, user]);

  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/products/${id}`);
        const { data } = response;
        setProduct(data);
        setImagePP(data.images[0]);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        dispatch(setAlert("  el id del producto no existe  ", "error"));
        console.log(error);
        setLoading(false);
      }
      try{
        const response = await axios.post(
          `${VITE_BACKEND_URL}/products/getrevbyid`,
          { productIdRev: id });
        const { data } = response;
        setRevData(data);
      }catch (error){
        console.log(error);
      }
      try{
        const response = await axios.get(
          `${VITE_BACKEND_URL}/users`);
        const { data } = response;
        setUserData(data);
      }catch (error){
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!hasScrolled) {
      window.scrollTo(0, 0);
      setHasScrolled(true);
    }
  }, [hasScrolled]);

  useEffect(() => {}, [imagePP]);
  // Cambiar la imagen principal cuando se haga clic en un botón de imagen
  const carousel = (event) => {
    setImagePP(product.images[event.target.value]);
  };

  const handleAddToCart = () => {
    if (userId) {
      dispatch(addToCart(product, userId));
    } else if (!userId) {
      dispatch(
        setAlert(
          "Debes estar logueado para agregar un producto al carrito",
          "warning"
        )
      );
    }
  };

  return (
    <div>
      <Nav />
      {alertState.visible && (
        <AlertTech message={alertState.message} type={alertState.type} />
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="div_detail">
          <div className="div_container_detail">
            <div className="div_derecha_detail">
              <div className="div_info">
                <p className="nuevo">Nuevo</p>
                <h2 className="nombre">{product.name}</h2>
                <Stars revData={revData}/>  {/* <------------ promerio de estrellas */}
                <p className="descripcion">{product.description}</p>
                {product.discount > 0 ? (
                  <div className="div_price_discount_detail">
                    <h2 className="price_discount_detail">
                      {toFormatPrice(product.price, product.discount)}
                    </h2>
                    <h2 className="percent_discount_price">
                      %{product.discount}
                    </h2>
                    <h2 className="price_no_discount">
                      {toFormatPrice(product.price)}
                    </h2>
                  </div>
                ) : (
                  <h2 className="precio">{toFormatPrice(product.price)}</h2>
                )}
              </div>

              <div className="div_price_button">
                <Button
                  variant="contained"
                  className="button_agregar"
                  endIcon={<LocalMallIcon />}
                  onClick={handleAddToCart}
                >
                  Agregar al Carrito
                </Button>
                <p className="stock">{product.stock} unidades disponibles</p>
              </div>

              <div className="div_beneficios">
                <p className="beneficio">
                  <KeyboardReturnIcon /> Devolución gratis
                </p>
                <p className="beneficio">
                  <ShieldOutlinedIcon /> Compra protegida
                </p>
                <p className="beneficio">
                  <WorkspacePremiumOutlinedIcon /> 12 meses de garantía de
                  fábrica
                </p>
              </div>
            </div>

            <div className="div_imagenes">
              <div className="imgP_Container">
                {product.images && (
                  <div className="imagenPrincipal_container">
                    <img
                      className="imagenPrincipal"
                      src={imagePP || product.images[0]}
                      alt={product.name}
                    />
                  </div>
                )}
              </div>

              <div>
                {product.images &&
                  product.images.map((imag, index) => (
                    <div className="imagenBoton_container" key={index}>
                      <button
                        onClick={carousel}
                        value={index}
                        className="boton_imagen_detail"
                        style={{
                          backgroundImage: `url(${imag})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <ReviewsDetail revData={revData} userData={userData}/>  {/* <------ aqui estan las reseñas */}
          <h2 className="relacionados">Productos relacionados</h2>
          <div className="div_carrusel">
            <DetailCarousel product={product} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Detail;

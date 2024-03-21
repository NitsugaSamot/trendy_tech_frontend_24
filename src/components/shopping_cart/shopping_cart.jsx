const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cart_item";
import Nav from "../../components/nav/nav";
import Footer from "../../views/footer/footer";
import iconoCarrito from "../../assets/online-shopping (1).png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./shopping_cart.css";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../context-client/hooks/useAuth";
import { toFormatPrice } from "../../helpers/toFormatPrice";
import { setAlert, initCart } from "../../redux/actions";
import AlertTech from "../alert/alert";

initMercadoPago(VITE_MP_PUBLIC_KEY);
const ShoppingCart = () => {
  const cart = useSelector((state) => state.shoppingCart);
  console.log(cart);
  const alertState = useSelector((state) => state.alert);
  const [total, setTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState(null);
  const [button, setButton] = useState(false);
  const totalProductsInCart = cart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  const dispatch = useDispatch();
  const userForId = useSelector((state) => state.userData);
  const { user } = useAuth0();
  const { auth } = useAuth();
  const [client, setClient] = useState({});

  const fetchData = async () => {
    let id;
    let email;
    if (auth && auth.email && auth.id) {
      email = auth.email;
      id = auth.id;
    } else if (user && user.email) {
      email = user.email;
    }
    if (userForId && userForId.id) {
      id = userForId.id;
    }
    if (email) {
      try {
        const result = await axios.get(
          `${VITE_BACKEND_URL}/users/email/${email}`
        );
        setClient(result.data);

        dispatch(initCart(id));
      } catch (error) {
        console.error("Error al obtener datos del usuario", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth, user]);

  // Inicio de compra mp
  const handleBuy = async () => {
    // Verifica si esta logueado
    console.log("Hay cliente para la compra", client);
    if (!client.id) {
      dispatch(
        setAlert("Debes estar logueado para efectuar la compra.", "warning")
      );
      return;
    }

    // Crea la preferencia de mercado pago
    const id = await createPreference(cart);
    if (id) {
      setPreferenceId(id);
      await createNewOrder();
    }
    setButton(true);
  };

  const createNewOrder = async () => {
    const obj = {
      products: cart,
      userId: client.id,
      total,
    };
    const response = await axios.post(`${VITE_BACKEND_URL}/orders/create`, obj);
    return;
  };

  const createPreference = async () => {
    const productos = cart.map((product) => {
      return {
        id: product.id,
        title: product.name,
        unit_price: Number(product.price),
        picture_url: product.images[0],
        quantity: Number(product.quantity),
      };
    });

    try {
      // Post a mercado pago
      const response = await axios.post(
        `${VITE_BACKEND_URL}/checkout/create_preference`,
        { productos }
      );

      const id = response.data;
      return id; //preference id
    } catch (error) {
      console.error("Error al crear la preferencia", error);
    }
  };
  // ! fin de compra mp

  let handleTotal = () => {
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotal(total);
  };

  useEffect(() => {
    handleTotal();
  }, [cart]);

  return (
    <div className="shopping-cart-container">
      {alertState.visible && (
        <AlertTech message={alertState.message} type={alertState.type} />
      )}
      <Nav />
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart">
            <img
              src={iconoCarrito}
              alt="carrito vacio"
              className="empty-cart-icon"
            />
            <h2>¡Tu carrito está vacío!</h2>
            <NavLink to="/home" className="home-button">
              Ver productos
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart">
            <div className="cart-items">
              <div className="cart-title">
                <h2>Productos</h2>
              </div>
              {cart.map((product) => (
                <div key={product.id}>
                  <CartItem
                    key={product.id}
                    product={product}
                    userId={client.id}
                  />
                </div>
              ))}
            </div>
            <div className="cart-summary-container">
              <div className="cart-summary">
                <div className="cart-summary-title-container">
                  <h2 className="cart-summary-title">Resumen de compra</h2>
                </div>
                <div className="cart-summary-details">
                  {cart.length === 1 ? (
                    <div className="cart-summary-total-container">
                      <div className="cart-summary-total-detail">
                        <p>Producto</p>
                        <p>{toFormatPrice(total)}</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <p>Envío</p>
                        <p>Gratis</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <h2>Total</h2>
                        <h2>{toFormatPrice(total)}</h2>
                      </div>
                      <div className="cart-summary-total-button">
                        <button
                          onClick={handleBuy}
                          disabled={button}
                          className="confirm-button"
                        >
                          {button ? "Confirmado" : "Confirmar compra"}
                        </button>
                        {preferenceId && (
                          <Wallet
                            initialization={{ preferenceId }}
                            visible={button}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="cart-summary-total-container">
                      <div className="cart-summary-total-detail">
                        <p>Productos ({totalProductsInCart})</p>
                        <p>{toFormatPrice(total)}</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <p>Envío</p>
                        <p>Gratis</p>
                      </div>
                      <div className="cart-summary-total-detail">
                        <h2>Total</h2>
                        <h2>{toFormatPrice(total)}</h2>
                      </div>
                      <div className="cart-summary-total-button">
                        <button
                          onClick={handleBuy}
                          disabled={button}
                          className="confirm-button"
                        >
                          {button ? "Confirmado" : "Confirmar compra"}
                        </button>
                        {preferenceId && (
                          <Wallet
                            initialization={{ preferenceId }}
                            visible={button}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer className="footer" />
    </div>
  );
};

export default ShoppingCart;

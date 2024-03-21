import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import {
  GET_ALL_PRODUCTS,
  SEARCH_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_PRICE,
  FILTER_ALL,
  SHOW_ALERT,
  HIDE_ALERT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  SET_SEARCH_ON,
  SET_OPEN_MODAL_LOGIN,
  USER_DATA,
  SHOW_DISCOUNTS_PRODUCTS,
  SET_SHOW_DISCOUNTS_PRODUCTS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  GET_FAVORITES_USER,
  INIT_CART
} from "./action-types";

export const getAllProducts = () => {
  console.log("dispatch");
  return async function (dispatch) {
    try {
      const all = await axios(`${VITE_BACKEND_URL}/products`);
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: all.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchByName = (product) => {
  return async function (dispatch) {
    try {
      const foundProduct = await axios(
        `${VITE_BACKEND_URL}/products/?name=${product}`
      );
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: foundProduct.data,
      });
    } catch (error) {
      console.log("searchByName error: ", error.message);
    }
  };
};

export const orderByPrice = (payload) => {
  return {
    type: ORDER_BY_PRICE,
    payload: payload,
  };
};

export const orderByName = () => {
  return {
    type: ORDER_BY_NAME,
  };
};

export const filterAll = (payload) => {
  return function (dispatch) {
    return dispatch({
      type: FILTER_ALL,
      payload: payload,
    });
  };
};

export const setAlert = (message, type) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        message,
        type,
      },
    });
    console.log(`${message}, ${type}`);
    // Limpia el alerta después de 3 segundos
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 3000);
  };
};

//http://localhost:3004/products/filter?color=1&type=1&brand=3&minPrice=100&maxPrice=100000
// ejemplo de ruta pata filtro combinado

export const initCart = (id) => {
  return async function (dispatch) {
    try {
      const cartOpen = await axios.get(`${VITE_BACKEND_URL}/cart/open/${id}`);
      const { products } = cartOpen.data;
      console.log("este es el prod del init", products);
      return dispatch({
        type: INIT_CART,
        payload: products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (product, userId) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${VITE_BACKEND_URL}/cart/create`, {
        userId,
      });
      if (!data.status) {
        const addItem = await axios.put(`${VITE_BACKEND_URL}/cart/addItem`, {
          userId,
          productId: product.id,
        });
        if (addItem.data === "Ya está en el carrito.")
          return dispatch(
            setAlert("Este producto ya se encuentra en el carrito!", "warning")
          );
        dispatch(
          setAlert(`${product.name} fue añadido al carrito...`, "success")
        );
      }

      console.log("producto añadido al carrito: ", product);
      return dispatch({
        type: ADD_TO_CART,
        payload: product,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeFromCart = (id, userId) => {
  axios.put(`${VITE_BACKEND_URL}/cart/delete`, {
    userId,
    productId: id,
  });
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};

export const increaseQuantity = (id, userId) => {
  axios.put(`${VITE_BACKEND_URL}/cart/increaseQuantity`, {
    userId,
    productId: id,
  });
  return {
    type: INCREASE_QUANTITY,
    payload: id,
  };
};

export const decreaseQuantity = (id, userId) => {
  axios.put(`${VITE_BACKEND_URL}/cart/discountQuantity`, {
    userId,
    productId: id,
  });
  return {
    type: DECREASE_QUANTITY,
    payload: id,
  };
};

export const searchOnSwitch = (payload) => {
  return {
    type: SET_SEARCH_ON,
    payload,
  };
};
export const getuserData = (payload) => {
  return {
    type: USER_DATA,
    payload: payload,
  };
};

export const banUser = (payload) => {
  return {
    type: SET_OPEN_MODAL_LOGIN,
    payload: payload,
  };
};

export const showDiscountsProducts = (payload) => {
  return {
    type: SHOW_DISCOUNTS_PRODUCTS,
    payload,
  };
};

export const setShowDiscountsProducts = (payload) => {
  return {
    type: SET_SHOW_DISCOUNTS_PRODUCTS,
    payload,
  };
};

export const addToFavorites = (product, userId) => {
  return async function (dispatch) {
    try {
      const getProduct = await axios.post(`${VITE_BACKEND_URL}/favorites/`, {
        product,
        userId,
      });

      dispatch({
        type: ADD_TO_FAVORITES,
        payload: getProduct.data.result,
      });
    } catch (error) {
      console.error("Error al agregar a favoritos:", error);
    }
  };
};

export const removeFromFavorites = (product, userId) => {

  return async function (dispatch) {
    try {
      const result = await axios.post(`${VITE_BACKEND_URL}/favorites/delete/`, {
        product,
        userId
      });
      console.log("Esto es lo que devuelve", result.data.result);
      dispatch({
        type: REMOVE_FROM_FAVORITES,
        payload: result.data.result
      });
    } catch (error) {
      console.error("Error al quitar de favoritos:", error);
    }
  };
};

export const getFavoritesUser = (payload) => {
  console.log("Asi me llega a la action", payload);
  return {
    type: GET_FAVORITES_USER,
    payload: payload.userFavorites,
  };
};

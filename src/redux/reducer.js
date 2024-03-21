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
  USER_DATA,
  SET_OPEN_MODAL_LOGIN,
  SET_SHOW_DISCOUNTS_PRODUCTS,
  SHOW_DISCOUNTS_PRODUCTS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  GET_FAVORITES_USER,
  INIT_CART
} from "./action-types";

const initialState = {
  allProducts1: [],
  allProducts2: [],
  allProductsSearch: [],
  allProductsSearch2: [],
  searchOn: false,
  discountsProducts: [],
  setDiscounts: false,
  shoppingCart: [],
  userData: {},
  setOpen: false,
  favoriteProducts: [],
  alert: {
    visible: false,
    message: "",
    type: "",
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INIT_CART:
      return {
        ...state,
        shoppingCart: payload,
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts1: payload,
        allProducts2: payload,
        allProductsSearch: payload,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        allProductsSearch: payload,
        allProductsSearch2: payload,
      };
    case ORDER_BY_PRICE:
      let productsByPrice = [...state.allProducts1];
      let productsByPrice2 = [...state.allProductsSearch];
      if (payload === "desc") {
        productsByPrice = productsByPrice.sort((a, b) => a.price - b.price);
        productsByPrice2 = productsByPrice2.sort((a, b) => a.price - b.price);
      }
      if (payload === "asc") {
        productsByPrice = productsByPrice.sort((a, b) => b.price - a.price);
        productsByPrice2 = productsByPrice2.sort((a, b) => b.price - a.price);
      }
      return {
        ...state,
        allProducts1: productsByPrice,
        allProductsSearch: productsByPrice2,
      };

    case ORDER_BY_NAME:
      let productsByName = state.allProducts1;
      if (payload === "a-z") {
        productsByName = productsByName.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (payload === "z-a") {
        productsByName = productsByName.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        allProducts1: products,
      };

    case FILTER_ALL:
      return {
        ...state,
        allProducts1: payload,
        allProductsSearch: payload,
      };
    case SHOW_ALERT:
      return {
        ...state,
        alert: {
          visible: true,
          message: payload.message,
          type: payload.type,
        },
      };
    case HIDE_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          visible: false,
        },
      };
    case ADD_TO_CART:
      let found = state.shoppingCart.find(
        (product) => product.id === payload.id
      );
      if (found) {
        return {
          ...state,
          shoppingCart: state.shoppingCart,
        };
      } else {
        return {
          ...state,
          shoppingCart: [...state.shoppingCart, { ...payload, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          (product) => product.id !== payload
        ),
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((product) => {
          if (product.id === payload) {
            if (product.quantity < product.stock) {
              product.quantity += 1;
              console.log(product.name, product.quantity);
            } else {
              product.quantity = product.stock;
              console.log("no se puede aumentar mas");
            }
            return product;
          }
          return product;
        }),
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        shoppingCart: state.shoppingCart.map((product) => {
          if (product.id === payload) {
            if (product.quantity > 1) {
              product.quantity -= 1;
              console.log(product.name, product.quantity);
            } else {
              product.quantity = 1;
              console.log("no se puede quitar mas");
            }
            return product;
          }
          return product;
        }),
      };
    case SET_SEARCH_ON:
      if (payload === true) {
        return {
          ...state,
          searchOn: payload,
          allProducts1: state.allProducts2,
        };
      } else {
        return {
          ...state,
          searchOn: payload,
        };
      }
    case USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    case SET_OPEN_MODAL_LOGIN:
      return {
        ...state,
        setOpen: payload,
      };
    case SHOW_DISCOUNTS_PRODUCTS:
      const products = state.allProducts2.filter(
        (product) => product.discount > 0
      );
      return {
        ...state,
        discountsProducts: products,
      };

    case SET_SHOW_DISCOUNTS_PRODUCTS:
      return {
        ...state,
        setDiscounts: payload,
      };
      case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteProducts: payload,
      };

    case REMOVE_FROM_FAVORITES:
    
      return {
        ...state,
        favoriteProducts: payload,
      };

      case GET_FAVORITES_USER: 
      
      return {
        ...state,
        favoriteProducts: payload
      }

    default:
      return { ...state };
  }
};

export default reducer;

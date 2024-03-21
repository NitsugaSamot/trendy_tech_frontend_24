


const validationForm = (form) => {
  const { name, price, discount, description, stock, brand, color, type } = form;
  const error = {
    name: "",
      price: "",
    discount:"",
    description: "",
    stock: "",
    brand: "",
    color: "",
    type: "",
    imageFiles: "",
  };

  // Validación de nombre
  if (typeof name !== "string") {
    error.name = "El nombre debe ser una cadena de caracteres";
  } else if (name.length == 0) {
    error.name = "El nombre no puede estar vacío";
  } else if (name.length > 150) {
    error.name = "El nombre no puede tener más de 150 caracteres";
  } else if (name.length <= 10) {
    error.name = "El nombre no puedo contener menos de 10 caracteres";
  } else {
    error.name = "";
  }

  // Validacion de precio
  if (typeof price !== "number") {
    error.price = "El precio debe ser un número";
  } else if (price < 0) {
    error.price = "El precio no puede ser negativo";
  } else if (price == 0) {
    error.price = "El precio no puede ser 0";
  } else if (price > 1600000) {
    error.price = "El precio no puede ser mayor a 1600000";
  } else if (price <= 100) {
    error.price = "El precio no puede ser menor a 100";
  } else {
    error.price = "";
  }

  // Validacion de descuento
  if (typeof discount !== "number") {
    error.discount = "El descuento a aplicar debe ser un número";
  } else if (discount === "") {
    error.discount = "Debes especificar un numero entre 0 y 90%";
  } else if (discount < 0) {
    error.discount = "El descuento a aplicar no puede ser menor a 0";
  } else if (discount > 90) {
    error.discount = "El descuento a aplicar no puede ser mayor al 90%";
  } else {
    error.discount = "";
  }

  // Validacion de descripcion
  if (typeof description !== "string") {
    error.description = "La descripción debe ser una cadena de caracteres";
  } else if (description.length == 0) {
    error.description = "La descripción no puede estar vacía";
  } else if (description.length > 2000) {
    error.description = "La descripción no puede tener más de 2000 caracteres";
  } else {
    error.description = "";
  }

  // Validacion de stock
  if (typeof stock != "number") {
    error.stock = "El stock debe ser un número";
  } else if (stock < 0) {
    error.stock = "El stock no puede ser negativo";
  } else if (stock > 500) {
    error.stock = "El stock no puede ser mayor a 500 unidades";
  } else {
    error.stock = "";
  }
  // Validacion de brand
  if (typeof brand !== "string") {
    error.brand = "La marca debe ser una cadena de caracteres";
  } else if (brand.length > 15) {
    error.brand = "La marca no puede tener más de 15 caracteres";
  } else if (brand.length == 0) {
    error.brand = "La marca no puede estar vacío";
  } else if (brand.length <= 1) {
    error.brand = "La marca no puede tener menos de 1 caracter";
  } else {
    error.brand = "";
  }

  // Validacion de color
  if (typeof color !== "string") {
    error.color = "El color debe ser una cadena de caracteres";
  } else if (color.length > 15) {
    error.color = "El color no puede tener más de 15 caracteres";
  } else if (color.length == 0) {
    error.color = "El color no puede estar vacío";
  } else if (color.length <= 2) {
    error.color = "El color no puede tener menos de 1 caracter";
  } else {
    error.color = "";
  }

  // Validacion de type
  if (typeof type !== "string") {
    error.type = "El tipo debe ser una cadena de caracteres";
  } else if (type.length > 15) {
    error.type = "El tipo no puede tener más de 15 caracteres";
  } else if (type.length == 0) {
    error.type = "El tipo no puede estar vacío";
  } else if (type.length <= 1) {
    error.type = "El tipo no puede tener menos de un caracter";
  } else {
    error.type = "";
  }

  return error;
};
export default validationForm;

const regexUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
const regexImg = /.(jpg|jpeg|png|gif|bmp|svg)$/i;
const validationForm = (form, imageFil) => {
  const {
    name,
    price,
    description,
    stock,
    discount,
    brand,
    color,
    type,
    images,
  } = form;
  const error = {
    name: "",
    price: "",
    description: "",
    stock: "",
    discount: "",
    brand: "",
    color: "",
    type: "",
    images: "",
    imageFiles: "",
  };

  // Validación de nombre
  if (typeof name !== "string") {
    error.name = "El nombre debe ser una cadena de caracteres";
  } else if (name.length == 0) {
    error.name = "El nombre no puede estar vacío";
  } else if (name.length > 70) {
    error.name = "El nombre no puede tener más de 70 caracteres";
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
  } else if (price > 1000000) {
    error.price = "El precio no puede ser mayor a 1 millón";
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
  } else if (description.length > 1000) {
    error.description = "La descripción no puede tener más de 1000 caracteres";
  } else {
    error.description = "";
  }

  // Validacion de stock
  if (typeof stock != "number") {
    error.stock = "El stock debe ser un número";
  } else if (stock < 0) {
    error.stock = "El stock no puede ser negativo";
  } else if (stock == 0) {
    error.stock = "El stock no puede estar vacio";
  } else if (stock > 500) {
    error.stock = "El stock no puede ser mayor a 500 unidades";
  } else {
    error.stock = "";
  }
  // Validacion de brand
  if (typeof brand !== "string") {
    error.brand = "El brand debe ser una cadena de caracteres";
  } else if (brand.length > 20) {
    error.brand = "El brand no puede tener más de 20 caracteres";
  } else if (brand.length == 0) {
    error.brand = "El brand no puede estar vacío";
  } else {
    error.brand = "";
  }
  // Validacion de color
  if (typeof color !== "string") {
    error.color = "El color debe ser una cadena de caracteres";
  } else if (color.length > 20) {
    error.color = "El color no puede tener más de 20 caracteres";
  } else if (color.length == 0) {
    error.color = "El color no puede estar vacío";
  } else {
    error.color = "";
  }

  // Validacion de type
  if (typeof type !== "string") {
    error.type = "El type debe ser una cadena de caracteres";
  } else if (type.length > 20) {
    error.type = "El type no puede tener más de 20 caracteres";
  } else if (type.length == 0) {
    error.type = "El type no puede estar vacío";
  } else {
    error.type = "";
  }

  // Validación de imágenes Para url
  if (Array.isArray(images)) {
    error.image = [];
    images.forEach((item, index) => {
      if (typeof item === "string" && !regexUrl.test(item)) {
        error.image[index] = `La imagen nro ${index + 1} no es una URL válida`;
      } else if (typeof item !== "string") {
        error.image[index] = `Tipo de dato incorrecto: La imagen nro ${
          index + 1
        } debe ser una cadena de caracteres y tenes una url`;
      }
    });
  } else if (images.length === 0) {
    error.images = ["No hay imágenes"];
  } else {
    error.images = "";
  }

  // ?? Validación de imágenes para tipo de archivos
  if (Array.isArray(imageFil)) {
    error.imageFiles = [];
    console.log(error.imageFiles);
    imageFil.forEach((item, index) => {
      if (typeof item === "string" || !regexImg.test(item)) {
        error.imageFiles[index] = `La imagen nro ${
          index + 1
        } no es un archivo de imagen válido`;
      } else if (typeof item !== "string") {
        error.imageFiles[index] = `Tipo de dato incorrecto: La imagen nro ${
          index + 1
        } debe ser una cadena de caracteres y tenes un archivo de imagen`;
      }
      console.log(error.imageFiles);
    });
  } else if (images.length === 0) {
    error.imageFiles = ["Debes ingresar las imagenes"];
  } else {
    error.imageFiles = "";
  }

  return error;
};
export default validationForm;

export const toFormatPrice = (price, discount) => {
  const formatter = new Intl.NumberFormat("es-ar", {
    style: "currency",
    currency: "ARS", // Puedes ajustar la moneda según tu necesidad
  });

  if (discount > 0) {
    const priceWithDiscount = price - price * (discount / 100);
    const priceWithDiscountFomatted = formatter.format(priceWithDiscount);
    return priceWithDiscountFomatted;
  } else {
    const formattedPrice = formatter.format(price);
    return formattedPrice;
  }
};

export const toAplicateDiscount = (price, discount) => {
  const priceWithDiscount = price - price * (discount / 100);
  return priceWithDiscount;
};

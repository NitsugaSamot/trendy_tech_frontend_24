import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardMedia, Typography } from "@mui/material/";
import { NavLink, useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { toFormatPrice } from "../../helpers/toFormatPrice";
import "./card.css";

//favorito----------------------
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setAlert,
} from "../../redux/actions/";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AlertTech from "../alert/alert";
//---------------------------
export default function CardTech({
  images,
  id,
  name,
  price,
  discount,
  product,
  isFavorite,
  auth,
}) {
  const [priceCommon, setPriceCommon] = useState("");
  const [priceDiscount, setPriceDiscount] = useState("");
  const userData = useSelector((state) => state.userData);
  const alertState = useSelector((state) => state.alert);

  useEffect(() => {
    if (discount > 0) {
      const formatPriceDiscount = toFormatPrice(price, discount);
      setPriceDiscount(formatPriceDiscount);
      const formattedPrice = toFormatPrice(price);
      setPriceCommon(formattedPrice);
    } else {
      const formattedPrice = toFormatPrice(price);
      setPriceCommon(formattedPrice);
    }
  }, []);

  //--------Nuevo Favoritos---------------//
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAddToFavorites = () => {
    let userId;

    if (auth && auth.id) {
      userId = auth.id;
    } else if (userData && userData.id) {
      userId = userData.id;
    }

    if (userId) {
      if (!isFavorite) {
        dispatch(addToFavorites(product, userId));
      } else {
        dispatch(removeFromFavorites(product, userId));
      }
    } else {
      dispatch(setAlert("Usted no está logueado", "error"));
    }
  };

  return (
    <div>
      {alertState.visible && (
        <AlertTech message={alertState.message} type={alertState.type} />
      )}
      <Card
        className="divcontainer_card"
        sx={{
          height: "300px",
          padding: "4px",
          display: "flex",
          justifyContent: "center",
          boxSizing: "content-box",
          position: "relative",
          transition: ".2s",
        }}
      >
        <span
          role="button"
          onClick={handleAddToFavorites}
          style={{
            position: "absolute",
            top: "3px",
            left: "3px",
            backgroundColor: "#ffffffb8",
            borderRadius: "50px",
            display: "flex",
            padding: "2px",
          }}
        >
          {location.pathname !== "/" ? (
            isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )
          ) : null}
        </span>

        <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
          <Box sx={{ height: "50%", width: "100%" }}>
            <CardMedia
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              component="img"
              image={images[0]}
              alt={name}
            />
          </Box>
          <Box
            sx={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                fontWeight: "bold",
                maxHeight: "80px",
                fontFamily: "Poppins, sans-serif",
                color: "black",
                alignSelf: "center",
              }}
            >
              {name}
            </Typography>
            {priceDiscount ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                  paddingTop: "4px",
                  position: "relative",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    position: "absolute",
                    top: "-65%",
                    right: "-0%",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                    alignSelf: "center",
                    width: "120px",
                    height: "40px",
                    borderRadius: "25px",
                    backgroundColor: "#ffffff",
                    color: "#fd6f09",
                  }}
                >
                  {priceDiscount}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    position: "absolute",
                    top: "15%",
                    right: "0%",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    width: "45px",
                    height: "45px",
                    borderRadius: "25px",
                    backgroundColor: "white",
                    color: "#fd6f09",
                  }}
                >
                  %{discount}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    width: "120px",
                    fontFamily: "Poppins, sans-serif",
                    height: "40px",
                    backgroundColor: "#007bff",
                    borderRadius: "4px",
                    color: "#d2d2d2",
                    textDecoration: "line-through",
                  }}
                >
                  {priceCommon}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                  fontFamily: "Poppins, sans-serif",
                  paddingTop: "4px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    fontFamily: "Poppins, sans-serif",
                    width: "120px",
                    height: "40px",
                    backgroundColor: "#007bff",
                    borderRadius: "4px",
                    color: "white",
                  }}
                >
                  {priceCommon}
                </Typography>
              </Box>
            )}
          </Box>
        </NavLink>
      </Card>
    </div>
  );
}

// import * as React from "react";
// import { useEffect, useState } from "react";
// import Card from "@mui/material/Card";
// import { CardMedia, Typography } from "@mui/material/";
// import { NavLink, useLocation } from "react-router-dom";
// import { Box } from "@mui/system";
// import { toFormatPrice } from "../../helpers/toFormatPrice";
// import "./card.css";

// //favorito----------------------
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToFavorites,
//   removeFromFavorites,
//   setAlert,
// } from "../../redux/actions/";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import AlertTech from "../alert/alert";
// //---------------------------
// export default function CardTech({
//   images,
//   id,
//   name,
//   price,
//   discount,
//   product,
//   isFavorite,
//   auth,
// }) {
//   const [priceCommon, setPriceCommon] = useState("");
//   const [priceDiscount, setPriceDiscount] = useState("");
//   const userData = useSelector((state) => state.userData);
//   const alertState = useSelector((state) => state.alert);

//   useEffect(() => {
//     if (discount > 0) {
//       const formatPriceDiscount = toFormatPrice(price, discount);
//       setPriceDiscount(formatPriceDiscount);
//       const formattedPrice = toFormatPrice(price);
//       setPriceCommon(formattedPrice);
//     } else {
//       const formattedPrice = toFormatPrice(price);
//       setPriceCommon(formattedPrice);
//     }
//   }, []);

//   //--------Nuevo Favoritos---------------//
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const handleAddToFavorites = () => {
//     let userId;

//     if (auth && auth.id) {
//       userId = auth.id;
//     } else if (userData && userData.id) {
//       userId = userData.id;
//     }

//     if (userId) {
//       if (!isFavorite) {
//         dispatch(addToFavorites(product, userId));
//       } else {
//         dispatch(removeFromFavorites(product, userId));
//       }
//     } else {
//       dispatch(setAlert("Usted no está logueado", "error"));
//     }
//   };

//   return (
//     <div>
//       {alertState.visible && (
//         <AlertTech message={alertState.message} type={alertState.type} />
//       )}
//       <Card className="divcontainer_card">
//         <span
//           role="button"
//           onClick={handleAddToFavorites}
//         >
//           {location.pathname !== "/" ? (
//             isFavorite ? (
//               <FavoriteIcon color="error" />
//             ) : (
//               <FavoriteBorderIcon />
//             )
//           ) : null}
//         </span>

//         <NavLink to={`/detail/${id}`}  style={{ textDecoration: "none" }}>
//         <Box>
//       <img
//         src={images[0]}
//         alt={name}
//         style={{
//           width: "13rem",
//           height: "16rem",
//           borderRadius: "8px",
//           boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//           // Puedes agregar más estilos según tus necesidades
//         }}
//       />
//     </Box>
//           {/* <Box >
//             <CardMedia
//               component="img"
//               image={images[0]}
//               alt={name}
//               sx={{
//                 // Aquí puedes definir tus estilos personalizados
//                 width: "6rem", // Por ejemplo, hacer que la imagen ocupe todo el ancho
//                 height: "16rem",
//                 borderRadius: "8px", // Un borde redondeado
//                 boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Una sombra suave
//                 // Puedes agregar más estilos según tus necesidades
//               }}
//             />
//           </Box> */}
//           <Box>
//             <div className="div-name">
//               {name}
//             </div>
//             {priceDiscount ? (
//               <Box>
//                 <div
//                   variant="subtitle2"
//                   color="text.secondary"
//                 >
//                   {priceDiscount}
//                 </div>
//                 <div
//                   variant="subtitle2"
//                   color="text.secondary"
//                 >
//                   %{discount}
//                 </div>
//                 <div
//                   variant="subtitle2"
//                   color="text.secondary"
//                 >
//                   {priceCommon}
//                 </div>
//               </Box>
//             ) : (
//               <Box>
//                 <div
//                   variant="subtitle2"
//                   color="text.secondary"
//                 >
//                   {priceCommon}
//                 </div>
//               </Box>
//             )}
//           </Box>
//         </NavLink>
//       </Card>
//     </div>
//   );
// }

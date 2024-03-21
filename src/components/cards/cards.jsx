const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import Card from "../card/card";
import Empty from "./emptyCards";
import { Grid } from "@mui/material";

//---------------favoritos
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { getFavoritesUser } from "../../redux/actions";

const Cards = ({ currentProduct, auth }) => {
  //-----Favoritos-----------
  const favoriteProducts = useSelector((state) => state.favoriteProducts);
  const userData = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let userId;
      if (auth && auth.id) {
        userId = auth.id;
      } else if (userData && userData.id) {
        userId = userData.id;
      }
      console.log(userId);
      if (userId) {
        try {
          const result = await axios.get(
            `${VITE_BACKEND_URL}/favorites/${userId}`
          );
          dispatch(getFavoritesUser(result.data));
        } catch (error) {
          console.error("Error al obtener datos del usuario", error);
        }
      }
    };

    fetchData();
  }, [auth, userData]);
//-----------------------------------------------------------------------------
  return (
    <Grid container sx={{ }}>
      {currentProduct.length ? (
        currentProduct?.map((product) => {
          if (!product.isDeleted) {
            return (
              <Grid
                item
                sm={4}
                xs={6}
                md={4}
                lg={3}
                xl={3}
                sx={{ paddingTop: "10px", paddingLeft:"10px" }}
                key={product.id}
              >
                <Card
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  images={product.images}
                  price={product.price}
                  discount={product.discount}
                  brand={product.brand}
                  auth={auth}
                  product={product}
                  isFavorite={favoriteProducts.some(
                    (favoriteProduct) => favoriteProduct.id === product.id
                  )}
                />
              </Grid>
            );
          }
        })
      ) : (
        <Empty />
      )}
    </Grid>
  );
};

export default Cards;

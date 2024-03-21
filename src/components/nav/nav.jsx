import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Grid, Container } from "@mui/material";
import SearchBar from "../searchBar/searchBar";
import Trendy_Tech_Logo from "../../assets/Trendy-Tech logo recortado.png";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArchiveIcon from "@mui/icons-material/Archive";
import LoginModal from "../login/loginModal";
import useAuth from "../../context-client/hooks/useAuth";
import axios from "axios";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import "./nav.css";
import {
  initCart,
  setShowDiscountsProducts,
  showDiscountsProducts,
} from "../../redux/actions";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);
  const [admin, setAdmin] = useState(false);
  const location = useLocation();
  const cart = useSelector((state) => state.shoppingCart);
  const [onlyOneDispatch, setOnlyOneDispatch] = useState(false);
  const userForId = useSelector((state) => state.userData);
  const discountsProducts = useSelector((state) => state.discountsProducts);
  const { auth } = useAuth();

  useEffect(() => {
    let id;
    if (auth && auth.id) {
      id = auth.id;
    }
    if (userForId && userForId.id) {
      id = userForId.id;
    }

    if (!onlyOneDispatch) {
      dispatch(initCart(id));
      setOnlyOneDispatch(true);
    }
    const total = cart.reduce((acc, product) => acc + product.quantity, 0);
    setTotalProductsInCart(total);
  }, [cart]);

  const handleProductsButton = (event) => {
    if (discountsProducts.length > 0) {
      dispatch(setShowDiscountsProducts(false));
      navigate("/home");
    }
  };

  //para hacer el rrenderizado condicional de la nav secundaria//
  const shouldShowNav = location.pathname === "/";
  //-------------------------//
  const pathsWithNavAdmin = [
    "/admin",
    "/home",
    "/create",
    "/manageUsers",
    "/user",
    "/shopping-cart",
    "/delete",
    "/detail",
    "/sobre-nosotros",
    "/reviewadmin",
  ];
  const showNavAdmin = pathsWithNavAdmin.some((path) =>
    location.pathname.startsWith(path)
  );

  const handleMoveToFooter = () => {
    window.scrollTo(0, 0); // Scroll down
    navigate("/sobre-nosotros");
  };

  useEffect(() => {
    const { id } = auth;
    async function findAdmin() {
      if (auth.email) {
        try {
          const { id } = auth;
          const { data } = await axios.get(`${VITE_BACKEND_URL}/users/${id}`);
          if (data && data.isAdmin === true) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    if (id) {
      findAdmin();
    }
  }, [auth, admin]);
  // const searchAdmin = async () => {
  // };

  const handleDiscountsProducts = () => {
    dispatch(showDiscountsProducts());
    dispatch(setShowDiscountsProducts(true));
    navigate("/home");
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        sx={{
          backgroundColor: "#fd6f09",
          alignItems: "center",
          height: "120px",
          maxHeight: "120px",
        }}
      >
        <Grid
          item
          xs={5}
          sm={4}
          md={3}
          lg={3}
          xl={4}
          sx={{ paddingLeft: "14px" }}
        >
          <NavLink to={"/"}>
            <img
              alt="Trendy Tech"
              src={Trendy_Tech_Logo}
              className="Nav_Logo"
              style={{
                maxWidth: "140px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </NavLink>
        </Grid>
        <Grid item xs={7} sm={8} md={6} lg={6} xl={4}>
          <SearchBar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={4}
          sx={{ display: "flex", justifyContent: "end", paddingRight: "10px" }}
        >
          <NavLink to="/shopping-cart" className="Nav_IconoCarrito">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={totalProductsInCart} color="error">
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
              </Badge>
            </IconButton>
          </NavLink>
          <LoginModal className="Nav_IconoPerfil" />
        </Grid>
      </Grid>

      <AppBar position="static" color="text">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {admin && showNavAdmin ? (
            <div className="button_presentation">
              <NavLink to={"/delete"}>
                <Button
                  variant="contained"
                  color="error"
                  endIcon={<DeleteOutlineIcon />}
                  style={{ borderRadius: "50px", margin: "4px" }}
                >
                  Borrar
                </Button>
              </NavLink>

              <NavLink to="/create">
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "50px",
                    margin: "4px",
                  }}
                  endIcon={<ArchiveIcon />}
                >
                  Crear
                </Button>
              </NavLink>

              <NavLink to={"/admin"}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AutoFixHighIcon />}
                  style={{ borderRadius: "50px", margin: "4px" }}
                >
                  Editar
                </Button>
              </NavLink>

              <NavLink to={"/reviewadmin"}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AccountCircleIcon />}
                  style={{ borderRadius: "50px", margin: "4px" }}
                >
                  Reseñas
                </Button>
              </NavLink>

              <NavLink to="/home">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ borderRadius: "50px", margin: "4px" }}
                  // className="button_ingresar"
                  endIcon={<RocketLaunchIcon />}
                  onClick={handleProductsButton}
                >
                  Productos
                </Button>
              </NavLink>
              <NavLink to="/home">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ borderRadius: "50px", margin: "4px" }}
                  // className="button_ingresar"
                  endIcon={<LocalOfferIcon />}
                  onClick={handleDiscountsProducts}
                >
                  Descuentos
                </Button>
              </NavLink>

              <Button
                variant="contained"
                color="warning"
                style={{
                  borderRadius: "50px",
                  margin: "4px",
                }}
                endIcon={<PermContactCalendarIcon />}
                onClick={handleMoveToFooter}
              >
                Contáctenos
              </Button>
            </div>
          ) : shouldShowNav ? (
            <div className="button_presentation">
              <NavLink to="/home">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ borderRadius: "50px" }}
                  // className="button_ingresar"
                  endIcon={<RocketLaunchIcon />}
                >
                  Ingresar
                </Button>
              </NavLink>
            </div>
          ) : (
            <div className="button_presentation">
              <NavLink to="/home">
                <Button
                  variant="contained"
                  color="warning"
                  style={{ borderRadius: "50px", margin: "4px" }}
                  // className="button_ingresar"
                  endIcon={<RocketLaunchIcon />}
                  onClick={handleProductsButton}
                >
                  Productos
                </Button>
              </NavLink>
              {/* <NavLink to="/home"> */}
              <Button
                onClick={handleDiscountsProducts}
                variant="contained"
                color="warning"
                style={{ borderRadius: "50px", margin: "4px" }}
                // className="button_ingresar"
                endIcon={<LocalOfferIcon />}
              >
                Descuentos
              </Button>
              {/* </NavLink> */}

              <Button
                variant="contained"
                color="warning"
                style={{
                  borderRadius: "50px",
                  margin: "4px",
                }}
                endIcon={<PermContactCalendarIcon />}
                onClick={handleMoveToFooter}
              >
                Contáctenos
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;

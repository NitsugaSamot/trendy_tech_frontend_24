const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/cards/cards";
import Paginate from "../../components/paginate/paginate";
import NavBar from "../../components/nav/nav";
import Filter from "../../components/filter/filter";
import OrderBy from "../../components/orderBy/orderBy";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Loader from "../../components/loader/loader";
import Footer from "../footer/footer";
import { getAllProducts } from "../../redux/actions";
import autenticateAllUsers from "../../helpers/autenticateAllUsers";
import { getuserData, banUser } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../../context-client/hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../redux/actions";
import AlertTech from "../../components/alert/alert";
const Home = () => {
  window.scrollTo(0, 0);
  const allProducts1 = useSelector((state) => state.allProducts1);
  const allProductsSearch = useSelector((state) => state.allProductsSearch);
  const searchOn = useSelector((state) => state.searchOn);
  const discountsProducts = useSelector((state) => state.discountsProducts);
  const setDiscounts = useSelector((state) => state.setDiscounts);
  const alertState = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // Status de la orden y ticket
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const collection_status = queryParams.get("collection_status");
  const merchant_order_id = queryParams.get("merchant_order_id");

  const [loading, setLoading] = useState(true);

  //-------------autenticate user with cookies------------------//
  const isBanned = useSelector((state) => state.setOpen);
  const [ignacioMagic, setIgnacioMagic] = useState({});

  const { user } = useAuth0();
  const { auth } = useAuth();

  const [client, setClient] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const result = await autenticateAllUsers(user);
          setIgnacioMagic(result);
          if (result.isDeleted) {
            dispatch(banUser(true));
          } else {
            ignacioMagic && dispatch(getuserData(result));
            if (isBanned === true) dispatch(banUser(false));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [user]);
  //-----------------------------------------------------------//
  useEffect(() => {
    dispatch(getAllProducts());

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts1]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  let productsToDisplay;
  if (setDiscounts) {
    productsToDisplay = discountsProducts;
  } else {
    productsToDisplay = searchOn ? allProductsSearch : allProducts1;
  }
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = productsToDisplay.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(productsToDisplay.length / productsPerPage);

  // putApproved the order:

  const fetchData = async () => {
    let email;
    if (auth && auth.email) {
      email = auth.email;
    } else if (user && user.email) {
      email = user.email;
    }
    if (email) {
      try {
        const result = await axios.get(
          `${VITE_BACKEND_URL}/users/email/${email}`
        );
        setClient(result.data);
        setReady(true);
      } catch (error) {
        console.error("Error al obtener datos del usuario", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth, user]);

  const putApproved = async ({ id }) => {
    const response = await axios.put(
      `${VITE_BACKEND_URL}/orders/update/${id}`,
      {
        status: collection_status,
        ticket: merchant_order_id,
      }
    );
    console.log("respuesta put:", response);
    return;
  };

  useEffect(() => {
    if (ready && collection_status === "approved") {
      if (client.id) {
        putApproved(client);
        axios.put(`${VITE_BACKEND_URL}/cart/close/${client.id}`);
      }
      dispatch(
        setAlert(
          "Su compra ha sido exitosa, puede verificar su email para mas detalles.",
          "success"
        )
      );
    }
  }, [ready]);

  return (
    <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
      <NavBar />
      {alertState.visible && (
        <AlertTech mage={alertState.messageess} type={alertState.type} />
      )}
      {loading ? (
        <Loader />
      ) : (

        <>
                <Filter />

                <OrderBy />

                <Cards currentProduct={currentProduct} auth={auth} />

        </>
      )}

      {currentProduct.length ? (
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}
      <Footer />
    </div>
  );
};

export default Home;

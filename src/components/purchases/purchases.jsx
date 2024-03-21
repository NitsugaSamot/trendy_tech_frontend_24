const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Button, Card, CardMedia, CardContent, Typography, Grid, Divider } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import useAuth from "../../context-client/hooks/useAuth";
import axios from "axios";
import ReviewDialog from "./reviewDialog";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions";
import AlertTech from "../alert/alert";

const Purchases = () => {

    const dispatch = useDispatch();
    const alertState = useSelector(state => state.alert)
    const { auth } = useAuth();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userData, setUserData] = useState({}); //-------si algo tira error probar con null--------
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenDialog = (productId) => {
        console.log('este es el productId que llega al open', productId )
        setCurrentProductId(productId);
        setIsDialogOpen(true);
    };
    const handleCloseDialog = () => setIsDialogOpen(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let emailToSend;
            if (auth && auth.email) {
                emailToSend = auth.email;
            } else if (user && user.email) {
                emailToSend = user.email;
            }

            if (emailToSend) {
                try {
                    const result = await axios.get(
                        `${VITE_BACKEND_URL}/users/email/${emailToSend}`
                    );
                    setUserData(result.data);
                } catch (error) {
                    console.error("Error al obtener datos del usuario", error);
                }
            }
        };

        fetchData();
    }, [auth, user]);


    const handleSaveReview = async (rating, comment) => {
        try {
            console.log({
                userId: userData.id,
                productId: currentProductId,
                textReview: comment,
                stars: rating
            })
            const result = await axios.post(`${VITE_BACKEND_URL}/users/addreview`,
                {
                    userId: userData.id,
                    productId: currentProductId,
                    textReview: comment,
                    stars: rating
                }
            );
            dispatch(setAlert("Reseña agregada", "success"));
        } catch (error) {
            console.error("Error al agregar la reseña", error);
        }

        console.log("Rating:", rating, "Comment:", comment);
    };

    return (
        <div>
            <h1>Productos comprados</h1>
            {alertState.visible &&
                <AlertTech message={alertState.message} type={alertState.type} />
            }

            {userData && userData.orders && userData.orders.map(order => (
                <React.Fragment key={'order-'+ order.id}>
                    {order.products.map(product => (
                        order.status && (
                            <Card key={product.id} style={{ marginBottom: '15px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} md={2}>
                                        <CardMedia
                                            component="img"
                                            image={product.images[0]}
                                            alt={product.name}
                                            style={{ maxHeight: '100px', objectFit: 'cover' }}
                                        />
                                    </Grid>
                                    <Grid item xs={8} md={7}>
                                        <Typography variant="subtitle1">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" style={{ fontSize: '12px' }}>
                                            Descripción: {product.description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px' }}>
                                            Fecha de compra: {new Date(order.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography variant="body2" color="textSecondary" style={{ fontSize: '12px' }}>
                                            Precio: ${product.price}
                                        </Typography>
                                        <Button onClick={() => handleOpenDialog(product.id)} variant="contained" color="primary" size="small">
                                            Agregar reseña
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                            </Card>
                        )
                    ))}
                </React.Fragment>
            ))}

            <ReviewDialog
                open={isDialogOpen}
                handleClose={handleCloseDialog}
                handleSave={handleSaveReview}
            />
        </div>
    );
}

export default Purchases;
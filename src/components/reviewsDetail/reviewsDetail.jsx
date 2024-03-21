import { Rating, Card, CardContent, Typography, Avatar, Box, Grid } from "@mui/material";

const ReviewsDetail = ({ revData, userData }) => {
    const defaultImage = "https://res.cloudinary.com/dntrwijx5/image/upload/v1695410025/imagenes/emnvfsjtizz9luh9ohpx.jpg";

    const findUserById = (userId) => {
        return userData.find(user => user.id === userId);
    };

    return (
        <Box mt={4} style={{ width: '87%', display: 'flex', justifyContent: 'center' }}>
    
            {revData && revData.length > 0 ? (
                revData
                    .filter(review => review.isVisible)
                    .map(review => {
                        const user = findUserById(review.userId);
                        return (
                            <Card variant="outlined" style={{ marginBottom: '20px', width: '80%' }} key={review.id}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={2}>
                                            <Avatar
                                                src={user?.image || defaultImage} 
                                                alt={user?.name || `Usuario ${review.userId}`}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="subtitle1">
                                                {user ? user.name : `Usuario ${review.userId}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Rating name="read-only" value={review.punctuation} readOnly />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography variant="caption">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" color="textSecondary">
                                                {review.text}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        );
                    })
            ) : (
                <Typography variant="body2">
                    No hay reseñas disponibles.
                </Typography>
            )}
        </Box>
    );
    
    
}

export default ReviewsDetail;


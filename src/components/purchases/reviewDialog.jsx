import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Rating } from "@mui/material";

function ReviewDialog({ open, handleClose, handleSave }) {
    const [rating, setRating] = useState(2);
    const [comment, setComment] = useState('');

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar reseña</DialogTitle>
            <DialogContent>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Comentario"
                    type="text"
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    inputProps={{ maxLength: 60 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button
                    onClick={() => {
                        handleSave(rating, comment);
                        handleClose();
                    }}
                    color="primary"
                >
                    Comentar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReviewDialog;

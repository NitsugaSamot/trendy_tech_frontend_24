import { Alert as MUIAlert, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import "./alert.css"

// el type debe traer uno de los siguientes valores:  'error'  'info'  'success'  'warning' 
//  sintaxis para llamar a alert     <AlertTech message='hola calenius' type='error'/>
// se debe renderizar arriba del todo. por su transition y su position absolute

const AlertTech = ({ message, type }) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 3000); // tiempo en milisegundos

        return () => {
            clearTimeout(timer);  // limpiar el temporizador si el componente se desmonta antes de que se complete
        };
    }, []);

    return (
        <div className='AlertTech'>
            <Slide direction="down" in={showAlert} mountOnEnter unmountOnExit>
                <div>
                    <MUIAlert severity={type}>{message}</MUIAlert>
                </div>
            </Slide>
        </div>
    );
}

export default AlertTech;
import React from 'react';
import Nav from '../../components/nav/nav';
import Footer from '../footer/footer';
import Imagen from '../../assets/error-404.png';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import styles from './not_found.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <Nav />
            <div className={styles.notFound_container}>
                <div className={styles.notFound_imgContainer}><img src={Imagen} alt="Imagen de error 404" className={styles.notFound_img}/></div>
                <div className={styles.notFound_textContainer}>
                    <h2 className={styles.notFound_text}>No pudimos encontrar la página que estás buscando.</h2>
                    <div className={styles.notFound_buttonContainer}>
                        <NavLink to="/" className={styles.notFound_button}>Volver al Inicio</NavLink>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default NotFound;
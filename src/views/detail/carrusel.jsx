import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import CardCarrusel from "./card_carrusel";
import "./carrusel.css";
import "react-multi-carousel/lib/styles.css";

const DetailCarousel = ({ product }) => {
    const products = useSelector((state) => state.allProducts2);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        setProductos(products);
    })

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
            slidesToSlide: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    const marcas = {
        1: "HyperX",
        2: "Logitech",
        3: "Razer",
        4: "Logitech",
        5: "Samsung",
        6: "Sony",
        7: "Apple",
        8: "Bose",
        9: "Dell",
        10: "GoPro",
        11: "Canon",
        12: "Fitbit",
        13: "Logitech",
        14: "Redragon",
        15: "Logitech",
        16: "Sony",
        17: "Sony",
        18: "Sony",
        19: "Sony",
        20: "Sony",
        21: "Logitech",
        22: "Logitech",
        23: "Logitech",
        24: "HyperX",
        25: "HyperX",
        26: "Redragon",
        27: "HyperX",
        28: "Redragon",
        29: "Redragon",
        30: "HP",
        31: "HP",
        32: "HP",
        33: "Dell",
        34: "Dell",
        35: "Samsung",
        36: "Samsung",
        37: "Apple",
        38: "Apple",
        39: "Logitech",
        40: "Logitech",
        41: "Redragon",
        42: "Razer",
        43: "Razer",
        44: "HP",
        45: "HP",
        46: "HP",
        47: "Trust",
        48: "Trust"
      };
    const tipos = {
        1: 'Teclado',
        2: 'Mouse',
        3: 'Smartphone',
        4: 'Auriculares',
        5: 'Teclado',
        6: 'Camara',
        7: 'Consolas',
        8: 'Notebook',
        9: 'Auriculares',
        10: 'Monitor',
        11: 'Camara',
        12: 'Fitness Tracker',
        13: 'Teclado',
        14: 'Teclado',
        15: 'Teclado',
        16: 'Auriculares',
        17: 'Auriculares',
        18: 'Auriculares',
        19: 'Consolas',
        20: 'Auriculares',
        21: 'Auriculares',
        22: 'Auriculares',
        23: 'Auriculares',
        24: 'Auriculares',
        25: 'Auriculares',
        26: 'Teclado',
        27: 'Teclado',
        28: 'Auriculares',
        29: 'Teclado',
        30: 'Notebook',
        31: 'Notebook',
        32: 'Notebook',
        33: 'Notebook',
        34: 'Notebook',
        35: 'Notebook',
        36: 'Notebook',
        37: 'Notebook',
        38: 'Notebook',
        39: 'Mouse',
        40: 'Mouse',
        41: 'Mouse',
        42: 'Mouse',
        43: 'Mouse',
        44: 'Mouse',
        45: 'Mouse',
        46: 'Mouse',
        47: 'Mouse',
        48: 'Mouse'
      };

    let cards = () => {
        return productos.filter((prod) => (prod.brand === marcas[product.typeId] || prod.type === tipos[product.typeId])).map((el) => {
            return <CardCarrusel key={el.id} prod={el} />
        });
    }

    return (
        <div className="carrusel_container">
            <Carousel responsive={responsive}>
                {cards()}
            </Carousel>
        </div>
    )
}

export default DetailCarousel;
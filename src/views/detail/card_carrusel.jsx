import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card_carrusel.css';

const CardCarrusel = ({prod}) => {
    let { images, id, name, price } = prod;
    let navigate = useNavigate();

    const truncateName = (name, maxWords) => {
        const words = name.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return name;
    }

    const truncatedName = truncateName(name, 3);

    const handleNavigate = () => {
        navigate(`/detail/${id}`);
    }

    return (
        <button onClick={handleNavigate} className="cardCarrousel">
            <div className="cardCarrousel_container">
                <div className="cardCarrousel_img_container">
                    <img src={`${images[0]}`} alt={name} className='cardCarrousel_img' />    
                </div>
                <div className="name_container">
                    <p className="cardCarrousel_name">{truncatedName}</p>
                </div>
                <div className="price_container">
                    <p className="cardCarrousel_price">${price}</p>
                </div>
            </div>    
        </button>
    )
}

export default CardCarrusel;
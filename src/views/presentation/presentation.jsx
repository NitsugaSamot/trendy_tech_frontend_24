import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/actions";
import { Button } from "@mui/material";
import Nav from "../../components/nav/nav";
import Card from "../../components/card/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import banner1 from "../../assets/banner-publicitario-1.png";
import banner2 from "../../assets/banner-publicitario-2.png";
import banner3 from "../../assets/banner-publicitario-3.png";
import Footer from "../footer/footer";
import "./presentation.css";

const images = [banner1, banner2, banner3];

const Presentation = () => {
  const dispatch = useDispatch();
  const allProducts1 = useSelector((state) => state.allProducts1);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);

  //modificamos allPrducts1 para tener los ultimos 10 abjetos que esten en la vase de datos//
  const lastProducts = [...allProducts1].reverse();
  const first10Products = lastProducts.slice(0, 10);

  // const [hasScrolled, setHasScrolled] = useState(false);

  //settings del carrousel//
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      selectNewImage(selectedIndex, images);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [selectedImage]);

  // useEffect(() => {
  //   if (!hasScrolled) {
  //     window.scrollTo(100, 0);
  //     setHasScrolled(true);
  //   }
  // }, [hasScrolled]);

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 200);
  };

  const previous = () => {
    selectNewImage(selectedIndex, images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, images);
  };
  return (
    <>
      <Nav />
      <div className="div_container_presentation" style={{ height: "100vh" }}>
        <div className="div_image_carrusel">
          <img
            src={selectedImage}
            alt="publicidad"
            className={`carousel_img ${loaded ? "loaded" : ""}`}
            onLoad={() => setLoaded(true)}
          />
          <div>
            <div className="carousel_button_prev">
              <Button
                startIcon={<ArrowBackIosNewIcon />}
                onClick={previous}></Button>
            </div>
            <div className="carousel_button_next">
              <Button endIcon={<ArrowForwardIosIcon />} onClick={next}></Button>
            </div>
          </div>
        </div>
        <div className="div_container_carrousel2">
          <h2 className="h2_presentation">Productos de novedad</h2>
          <hr className="hr_presentation" />
          <div className="div_carrousel_latest">
            <Slider {...settings} className="carrousel">
              {first10Products?.map((product, index) => (
                <div key={index}>
                  <Card
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    images={product.images} //ver si image es un array con imagenes
                    price={product.price}
                    
                  />
                </div>
              ))}
            </Slider>
          </div>
          <hr className="hr_presentation" />
        </div>
        <hr />
        <Footer />
      </div>
    </>
  );
};

export default Presentation;

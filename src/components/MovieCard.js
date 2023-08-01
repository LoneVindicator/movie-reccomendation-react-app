import React from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import noImg from "../images/movie-no-img.png"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieModal from "./MovieModal";

export default function MovieCard(props) {



    const [showSlide, setShowSlide] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);

    // [props.viewableSlideCount, setViewableSlideCount] = React.useState(6.5);

    let slideLength = 2.5;

    function showHoverInfo(bool) {

        setIsHovered(bool);


    }

    function expandSlide() {

        // setTimeout( () => {

        //     setShowSlide(true);
        //     setIsHovered(true);

        //     slideLength = 2.5;
        //     props.slideStateChange(slideLength)


        // }, 300)



    }

    function contractSlide() {

        // setTimeout( () => {

        //     setShowSlide(false);
        //     setIsHovered(false);

        //     slideLength = 2.5;
        //     props.slideStateChange(slideLength)


        // }, 3000)



    }
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    let showScrollBar = "";

    const toggleModal = () => {

        setIsModalOpen(!isModalOpen);
        isModalOpen ? showScrollBar = "" : showScrollBar = "hidden";
        showHoverInfo(false);

        document.body.style.overflow = showScrollBar;


    }

    const handleToggleFavourite = (e) => {

        e.stopPropagation();

        const tempIsFavourite = isFavourite;
        setIsFavourite(!tempIsFavourite);

    }

    const handleImageError = (e) => {
        e.target.src = noImg;
      };

    return (

        <div className="carousel-card-container-overlay">



            <div className="carousel-card-container" onClick={expandSlide} onMouseEnter={() => { showHoverInfo(true) }} onMouseLeave={() => { showHoverInfo(false) }}>

                <div className="carousel-image-container" onClick={toggleModal}>

                    <img className={isHovered ? "carousel-movie-poster carousel-movie-poster-hover" : "carousel-movie-poster"} src={props.posterPath} onError={ handleImageError} loading="lazy"></img>

                    <div className="carousel-image-overlay-container">

                        {isHovered ?

                            (

                                isFavourite ? <FaHeart className="carousel-movie-poster-heart-icon-true" onMouseEnter={() => { showHoverInfo(true) }} onClick={ (e) => { handleToggleFavourite(e) } } /> :
                                    <FaRegHeart className="carousel-movie-poster-heart-icon" onMouseEnter={ () => { showHoverInfo(true) }} onClick={ (e) => { handleToggleFavourite(e) }} />
                            ) :
                            null



                        }



                    </div>

                </div>

                <div className="carousel-movie-title-container" >

                    <h1 className="carousel-movie-title hover">{props.title}</h1>




                </div>

                {isModalOpen &&

                    <MovieModal isModalOpen={isModalOpen} toggleModal={toggleModal} {...props} />

                }

            </div>

        </div>





    )




}
import React from "react";

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
    // [props.viewableSlideCount, setViewableSlideCount] = React.useState(6.5);

    let slideLength = 2.5;

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
        isModalOpen? showScrollBar = "": showScrollBar = "hidden";

        document.body.style.overflow = showScrollBar;


    }




    return (



        <div className={isHovered ? "carousel-card-container" : "carousel-card-container-hover"} onClick={expandSlide} onMouseLeave={contractSlide}>

            <div className="carousel-image-container" onClick={toggleModal}>

                <img className="carousel-movie-poster" src={props.imgLink}></img>

            </div>

            <div className={isHovered ? "carousel-movie-title-container" : "carousel-movie-title-container-hover"} >

                <h1 className="carousel-movie-title hover">{props.movieName}</h1>



            </div>


            {isHovered &&

                <div className="carousel-card-info-container">

                    <h1 className="carousel-card-info-text carousel-movie-info">TV-MA · 2004 · 1h 35m </h1>
                    <h1 className="carousel-card-info-text carousel-movie-desc">
                        After witnessing his parents' death, Bruce learns the art of fighting to confront injustice.
                        When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.
                    </h1>

                </div>

            }

            {isModalOpen &&

                <MovieModal isModalOpen={isModalOpen} toggleModal = {toggleModal} {...props}/>

            }

        </div>





    )




}
import React from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import noImg from "../images/movie-no-img.png"
import { notifyError } from "../App";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieModal from "./MovieModal";
import { auth, isMovieFavorited, toggleMovieFavorite } from "../firebase";

import { onAuthCheckIfMovieIsFavourited, toggleModal, handleImageError, handleToggleFavourite } from "../utils";

export default function MovieCard(props) {


    const [isHovered, setIsHovered] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [userId, setUserId] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {

        onAuthCheckIfMovieIsFavourited(setUserId, props.id, setIsFavourite);

    }, []);

    //Fix for a bug

    React.useEffect(() => {

        setIsHovered(false);

        

    }, [isModalOpen]);

    function showHoverInfo(bool) {

        setIsHovered(bool);


    }

    const stopPropagationAndLaunchHandleToggleFavourite = (e) => {

        e.stopPropagation();
        handleToggleFavourite(userId, setIsFavourite, isFavourite, props, toggleMovieFavorite);


    }


    let showScrollBar = "";

    return (

        <div className="carousel-card-container-overlay">



            <div className="carousel-card-container" onMouseEnter={() => { showHoverInfo(true) }} onMouseLeave={() => { showHoverInfo(false) }} >

                <div className="carousel-image-container" onClick={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)}>

                    <img className={isHovered ? "carousel-movie-poster carousel-movie-poster-hover" : "carousel-movie-poster"} src={props.posterPath} onError={handleImageError} loading="lazy"></img>

                    <div className="carousel-image-overlay-container">

                        {isHovered ?

                            (

                                isFavourite ? <FaHeart className="carousel-movie-poster-heart-icon carousel-movie-poster-heart-icon-true" onMouseEnter={() => { showHoverInfo(true) }} onClick={(e) => stopPropagationAndLaunchHandleToggleFavourite(e)} /> :
                                    <FaRegHeart className="carousel-movie-poster-heart-icon" onMouseEnter={() => { showHoverInfo(true) }} onClick={(e) => stopPropagationAndLaunchHandleToggleFavourite(e)} />
                            ) :
                            null



                        }



                    </div>

                </div>

                <div className="carousel-movie-title-container" >

                    <h1 className="carousel-movie-title hover">{props.title}</h1>




                </div>

                {isModalOpen &&

                    <MovieModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)} handleToggleFavourite={() => handleToggleFavourite(userId, setIsFavourite, isFavourite, props, toggleMovieFavorite)} isFavourite={isFavourite}{...props} />

                }

            </div>

        </div>





    )




}
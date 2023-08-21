import React from "react"
import ReactDOM from "react-dom"
import Cast from "./Cast";
import tmdbLogo from "../images/tmdb-logo.svg"
import noPoster from "../images/movie-no-img.png";
import noBackdrop from "../images/backdrop-no-img.png";
import tmdbConfig from "../tmdb.json"
import { FaRegWindowClose } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { fetchMovieInfo, formatRuntime, handleBackdropError } from "../utils";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MovieModal(props) {


    const [movieData, setMovieData] = React.useState([]);
    const [viewableSlideCount, setViewableSlideCount] = React.useState(2);
    const [isHovered, setIsHovered] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const handleViewableSlideCountStateChange = (updatedValue) => {

        setViewableSlideCount(updatedValue);
    }

    //API Call to TMDB




    const handleSetMovieData = (movieInfo) => {

        // console.log("Movie Data");
        // console.log(movieInfo.cast);

        const posterPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieInfo.poster_path}`;
        const backdropPath = `https://www.themoviedb.org/t/p/original/${movieInfo.backdrop_path}`;
        const releaseDate = (movieInfo.release_date).substring(0, 4);
        const runtime = formatRuntime(movieInfo.runtime);
        const rating = movieInfo.vote_average.toFixed(1);
        const cast = movieInfo.cast;
        const genre = movieInfo.genres.map((genre) => genre.name);

        const newMovie = {
            id: movieInfo.id,
            title: movieInfo.original_title,
            synopsis: movieInfo.overview,
            releaseDate: releaseDate,
            runtime: runtime,
            rating: rating,
            cast: cast,
            posterPath: posterPath,
            backdropPath: backdropPath,
            genre: genre,

        };



        setMovieData(newMovie);
        setIsLoading(true)




    };

    function showHoverInfo(bool) {

        setIsHovered(bool);


    }

    React.useEffect(() => {

        const movieId = props.id;
        fetchMovieInfo(movieId, handleSetMovieData);


    }, []);


    return ReactDOM.createPortal(

        <div className="movie-modal-overlay" onClick={props.toggleModal}>


                <div className="movie-modal-content" onClick={(e) => e.stopPropagation()}>


                    <div className="modal-image-container">

                        <img className="modal-image-poster" src={movieData.backdropPath} onError={handleBackdropError} ></img>
                        <FaRegWindowClose className="modal-close-btn" onClick={props.toggleModal} />


                    </div>

                    <div className="modal-bottom-container">


                        <div className="modal-info-container">

                            <div className="modal-info-container-lhs">

                                <div className="carousel-card-container" onMouseEnter={() => { showHoverInfo(true) }} onMouseLeave={() => { showHoverInfo(false) }} >

                                    <div className="carousel-image-container" >

                                        <img className={isHovered ? "carousel-movie-poster carousel-movie-poster-hover modal-movie-poster" : "carousel-movie-poster"} src={movieData.posterPath} onError={props.handleImageError} loading="lazy"></img>

                                        <div className="carousel-image-overlay-container">

                                            {isHovered ?

                                                (

                                                    props.isFavourite ? <FaHeart className="carousel-movie-poster-heart-icon carousel-movie-poster-heart-icon-true" onMouseEnter={() => { showHoverInfo(true) }} onClick={(e) => { props.handleToggleFavourite(e) }} /> :
                                                        <FaRegHeart className="carousel-movie-poster-heart-icon" onMouseEnter={() => { showHoverInfo(true) }} onClick={(e) => { props.handleToggleFavourite(e, props.isFavourite) }} />
                                                ) :
                                                null



                                            }



                                        </div>

                                    </div>

                                </div>

                                <div className="modal-text-container">

                                    <h1 className="modal-text-movie-name">{movieData.title}</h1>
                                    <h1 className="modal-text-movie-info">{movieData.releaseDate} {movieData.genre && `· ${movieData.genre[0]}`} · {movieData.runtime}</h1>
                                    <div className="modal-rating-container">

                                        <img className="modal-rating-logo modal-tmdb-logo" src={tmdbLogo}></img>
                                        <p className="modal-rating-info modal-tmdb-rating">{movieData.rating}</p>


                                    </div>
                                    <h1 className="modal-text-movie-desc">{movieData.synopsis}</h1>

                                    <div className="modal-text-genre-container">

                                        {movieData.genre &&

                                            movieData.genre.map((item, index) => (
                                                <p key={index} className="modal-text-genre">{item}</p>
                                            ))}



                                    </div>


                                </div>


                            </div>



                            <div className="modal-cast-container">

                                <h1 className="modal-cast-title">Cast</h1>

                                <Swiper
                                    direction={'vertical'}
                                    centeredSlides={false}
                                    grabCursor={false}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper verticalCastSwiper"
                                    onSlideChange={(swiper) =>
                                        handleViewableSlideCountStateChange(swiper.activeIndex)
                                    }

                                    breakpoints={{
                                        // when window width is >= 320px

                                        110: {
                                            slidesPerView: 2.5,
                                            direction: 'horizontal',
                                            navigation: false,

                                        },

                                        365: {
                                            direction: 'horizontal',
                                            slidesPerView: 3.8,
                                            navigation: false,


                                        },

                                        620: {
                                            direction: 'horizontal',
                                            slidesPerView: 5.8,
                                            navigation: false,


                                        },

                                        1060: {
                                            direction: 'vertical',
                                            slidesPerView: 3,
                                            navigation: true,


                                        },


                                    }
                                    }



                                >

                                    {movieData.cast && movieData.cast.map((cast, index) => (

                                        <SwiperSlide key={index} >

                                            <Cast

                                                key={index}
                                                name={cast.name}
                                                character={cast.character}
                                                castId={cast.id}
                                                profilePath={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${cast.profile_path}`}
                                                toggleModal={props.toggleModal}
                                            >


                                            </Cast>

                                        </SwiperSlide>
                                    ))}

                                </Swiper>

                            </div>



                        </div>

                    </div>

                </div>


        </div>,

        document.getElementById("portal")
    )
}
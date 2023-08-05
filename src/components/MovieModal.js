import React from "react"
import ReactDOM from "react-dom"
import Cast from "./Cast";
import tmdbLogo from "../images/tmdb-logo.svg"
import axios from "axios";
import noPoster from "../images/movie-no-img.png";
import noBackdrop from "../images/backdrop-no-img.png";
import tmdbConfig from "../tmdb.json"
import closeBtn from "../images/close-btn.png"
import { FaRegWindowClose } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MovieModal(props) {

    const slidesPerPage = 6.4;
    const apiKey = tmdbConfig.apiKey;

    const [viewableSlideCount, setViewableSlideCount] = React.useState(2);
    const [isHovered, setIsHovered] = React.useState(false);

    console.log("WHAT IS PROPS.ISFAVOURITE")
    console.log(props.isFavourite)

    const handleViewableSlideCountStateChange = (updatedValue) => {

        setViewableSlideCount(updatedValue);
    }

    console.log("MovieModal has been opened");

    //API Call to TMDB

    const [movieData, setMovieData] = React.useState([]);


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



    };

    function showHoverInfo(bool) {

        setIsHovered(bool);


    }

    React.useEffect(() => {



        const fetchData = async () => {

            try {

                const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${index}?api_key=${apiKey}`);
                const castInfo = await axios.get(`https://api.themoviedb.org/3/movie/${index}/credits?api_key=${apiKey}`);



                // Assuming both APIs return data in the form of { data: ... }
                const responseMovieInfo = movieInfo.data;
                const responseCastInfo = castInfo.data;

                // Merge the data from both responses into the same object
                const mergedData = {
                    ...responseMovieInfo,
                    ...responseCastInfo,
                };

                // console.log("Is API Working??");
                // console.log(mergedData);

                handleSetMovieData(mergedData);

            } catch (error) {
                // Handle any errors that may occur during the API calls
                console.error('Error fetching data:', error);

            }
        };

        const index = props.id;



        fetchData(index);

    }, []);

    function formatRuntime(time) {

        if (typeof time !== 'number') {
            throw new Error('Invalid input: time should be a number.');
        }

        if (time < 0) {
            throw new Error('Invalid input: time should be a non-negative number.');
        }

        const hours = Math.floor(time / 60);
        const minutes = time % 60;

        // You can customize the output format as needed
        const formattedRuntime = `${hours}h ${minutes}m`;

        return formattedRuntime;


    }

    const handleImageError = (e) => {
        e.target.src = noPoster;
    };

    const handleBackdropError = (e) => {
        e.target.src = noBackdrop;
    };

    // console.log("hasItBeenUpdated")
    // console.log(movieData);
    // console.log(movieData.genre);


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

                                    <img className={ isHovered ? "carousel-movie-poster carousel-movie-poster-hover" : "carousel-movie-poster"} src={movieData.posterPath} onError={props.handleImageError} loading="lazy"></img>

                                    <div className="carousel-image-overlay-container">

                                        { isHovered ?

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
                                slidesPerView={3}
                                slidesPerGroup={3}
                                centeredSlides={false}
                                grabCursor={false}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={{
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
                                        slidesPerGroup: 2.5,
                                        direction: 'horizontal',

                                    },

                                    365: {
                                        direction: 'horizontal',
                                        slidesPerView: 3.8,
                                        slidesPerGroup: 3.8,

                                    },

                                    620: {
                                        direction: 'horizontal',
                                        slidesPerView: 5.8,
                                        slidesPerGroup: 5.8,

                                    },

                                    1060: {
                                        direction: 'vertical',
                                        slidesPerView: 3,
                                        slidesPerGroup: 3,

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
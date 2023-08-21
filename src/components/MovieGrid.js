import React from "react";
import ReactDOM from "react-dom"
import MovieCard from "./MovieCard";
import { FaRegWindowClose } from "react-icons/fa";
import noImg from "../images/cast-no-img.png"

import { fetchMoviesForGrid, handleCastImageError} from "../utils";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

// import required modules

import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// TODO: 

// 1. Separate MovieGrid into two modals; CastGrid, FavouriteGrid
// 2. Implement CastGrid  
// 3. Make search better
// 4. Filter by category
// 5. Refactor
// 6. Ignore just a push test
// 7. Use a loading skeleton

export default function MovieGrid(props) {

    const [movieData, setMovieData] = React.useState([]);
    const [actorInfo, setActorInfo] = React.useState([])

    const handleSetMovieData = (movieInfoArray) => {

        const updatedMovieData = movieInfoArray.map((movieInfo) => {

            const posterPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieInfo.poster_path}`;

            const newMovie = {
                id: movieInfo.id,
                title: movieInfo.original_title,
                poster_path: posterPath,

            };

            return newMovie;
        });

        setMovieData(updatedMovieData); // Assuming you have a state setter function called setMovieData
        // console.log("set Successful")

    };

    React.useEffect(() => {

       fetchMoviesForGrid(props.favouriteMovieArr, props.castId, handleSetMovieData, setActorInfo)

    }, []);

    return ReactDOM.createPortal(

        <div className="movie-modal-overlay" onClick={props.toggleMovieGridModal}>

            <div className="movie-grid-modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="grid-close-btn-container">


                    <FaRegWindowClose className="modal-close-btn grid-close-btn" onClick={props.toggleMovieGridModal} />


                </div>




                {props.favouriteMovieArr ? <h1 className="movie-grid-modal-title">Your Favourites</h1> :

                    <div className="grid-cast-info">

                        <div className="grid-cast-photo-container">

                            <img className="grid-cast-photo" src={props.profilePath} onError={ handleCastImageError } loading="lazy" ></img>


                        </div>

                        <div className="grid-cast-text">

                            <h1 className="movie-grid-modal-title grid-actor-name">{props.name}</h1>

                            <p className="movie-grid-modal-desc">{actorInfo.biography}</p>


                        </div>




                    </div>





                }



                <div className="movie-grid-container">
                    {movieData.map((movie) => (
                        <div key={movie.id} className="movie-grid-item">
                            <MovieCard
                                id={movie.id}
                                title={movie.title}
                                posterPath={movie.poster_path}
                                backdropPath={movie.backdrop_path}
                                synopsis={movie.synopsis}
                                runtime={movie.runtime}
                                rating={movie.rating}
                                genre={movie.genre}
                                releaseDate={movie.release_date}
                                cast={movie.cast}
                                {...props}

                            />
                        </div>
                    ))}
                </div>



            </div>



        </div>,

        document.getElementById("portal")


    )



}
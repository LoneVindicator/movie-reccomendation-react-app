import React from "react";
import tmdbLogo from "../images/tmdb-logo.svg"
import MovieModal from "./MovieModal";

import { toggleMovieFavorite, isMovieFavorited } from "../firebase";

import { fetchRandomMoviesForHero, newMovieObject, toggleModal, handleBackdropImageError, handleToggleFavourite, onAuthCheckIfMovieIsFavourited } from "../utils";

export default function Hero() {

    const [movieData, setMovieData] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [authUser, setAuthUser] = React.useState(null);
    
    let showScrollBar = "";



    const handleSetMovieData = (movieInfo) => {

        const newMovie = newMovieObject(movieInfo);
        setMovieData(newMovie);
    }

    React.useEffect(() => {

        fetchRandomMoviesForHero(handleSetMovieData);

    }, [])

    React.useEffect( () => {

        onAuthCheckIfMovieIsFavourited(setAuthUser, movieData.id, setIsFavourite)

    }, [isModalOpen])




    return (

        <div className="hero-component">

            <div className="hero-text-component">

                <h2 className="hero-title">{movieData.title}</h2>
                <h1 className="hero-info">{movieData.releaseDate} · {movieData.genre} · {movieData.runtime} </h1>

                <div className="rating-container">

                    <img className="rating-logo rating-tmdb-logo" src={tmdbLogo} ></img>
                    <p className="rating-info tmdb-rating">{movieData.rating}</p>


                </div>

                <p className="hero-desc">{movieData.synopsis}</p>
                <button className="btn hero-more-info-btn" onClick={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)}>More Info</button>

            </div>
            <div className="hero-image-component">

                <img className="hero-img" src={movieData.backdrop_path} onError={ handleBackdropImageError }></img>
            </div>

            {isModalOpen &&

                <MovieModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)} handleToggleFavourite={() => handleToggleFavourite( authUser, setIsFavourite, isFavourite, movieData, toggleMovieFavorite )} isFavourite={isFavourite} {...movieData}/>

            }


        </div>




    )
}
import React from "react";
import infoIcon from "../images/info-icon.png"
import MovieModal from "./MovieModal";

import { toggleMovieFavorite, isMovieFavorited } from "../firebase";

import { fetchRandomMoviesForHero, newMovieObject, toggleModal, handleToggleFavourite, onAuthCheckIfMovieIsFavourited } from "../utils";


export default function RateCard(props) {

    const [rateValue, setRateValue] = React.useState(0);
    const sliderRef = React.useRef(null);
    const [movieData, setMovieData] = React.useState([]);
    const [rateCardCounter, setRateCardCounter] = React.useState(0);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [authUser, setAuthUser] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    let showScrollBar = "";


    const handleSliderChange = () => {
        const value = sliderRef.current.value;
        setRateValue(value);

    };

    React.useEffect( () => {

        onAuthCheckIfMovieIsFavourited(setAuthUser, movieData.id, setIsFavourite)

    }, [isModalOpen])



    const handleSetMovieData = (movieInfo) => {

        const newMovie = newMovieObject(movieInfo);
        setMovieData(newMovie);
    }

    React.useEffect(() => {

        fetchRandomMoviesForHero(handleSetMovieData);

    }, [rateCardCounter]);

    const incrementRateCardCounter = () => {

        setRateCardCounter(rateCardCounter + 1);
    }

    return (

        <div className="hero-component rate-component">

            <div className="rating-text-component">

                <div className="rating-text-and-info-container">

                    <h2 className="hero-title">{movieData.title}</h2>
                    <img className="rate-info-icon" src={infoIcon} onClick={ () => toggleModal(setIsModalOpen, isModalOpen, showScrollBar) }></img>

                </div>

                <h1 className="hero-info"> {movieData.releaseDate} · {movieData.genre} · {movieData.runtime} </h1>
                <div className="rate-count-container-el">

                    <h1 className="rate-count-el">{rateValue}%</h1>
                    <input className="rate-count-slider" type="range" min="0" max="100" ref={sliderRef} value={rateValue} onChange={handleSliderChange}></input>
                    <h1 className="rate-count-prompt">Drag the slider to rate the movie</h1>


                </div>

                <div className="rate-btn-container">

                    <button className="btn rate-btn submit-btn">Submit</button>
                    <button className="btn rate-btn seen-btn" onClick={incrementRateCardCounter}>Haven't Seen</button>


                </div>




            </div>
            <div className="hero-image-component">

                <img className="hero-img" src={movieData.backdrop_path} loading="lazy"></img>
            </div>

            {isModalOpen &&

                <MovieModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)} handleToggleFavourite={() => handleToggleFavourite( authUser, setIsFavourite, isFavourite, movieData, toggleMovieFavorite )} isFavourite={isFavourite} id={ movieData.id} {...props} />

            }


        </div>




    )
}
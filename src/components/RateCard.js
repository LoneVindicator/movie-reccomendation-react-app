import React from "react";
import infoIcon from "../images/info-icon.png"
import MovieModal from "./MovieModal";

import { toggleMovieFavorite, isMovieFavorited } from "../firebase";

import { fetchRandomMoviesForHero, newMovieObject, toggleModal, handleToggleFavourite, onAuthCheckIfMovieIsFavourited, handleBackdropImageError } from "../utils";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function RateCard(props) {

    const [rateValue, setRateValue] = React.useState(0);
    const sliderRef = React.useRef(null);
    const [movieData, setMovieData] = React.useState([]);
    const [rateCardCounter, setRateCardCounter] = React.useState(0);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [authUser, setAuthUser] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState({
        backdrop: true,
        page: true,
    });

    let showScrollBar = "";


    const handleSliderChange = () => {
        const value = sliderRef.current.value;
        setRateValue(value);

    };

    React.useEffect(() => {

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

    React.useEffect(() => {

        if (isLoading.backdrop === false) {

            handleImageLoad("page");


        } else {

            setTimeout(() => {

                handleImageLoad("page");

            }, 5000);
        }


    }, [isLoading.backdrop]);

    const handleImageLoad = (key) => {

        setIsLoading((prevLoading) => ({
    
          ...prevLoading,
          [key]: false,
    
        }));
    
      };

    return (

        <div className="hero-component rate-component">

            <div className="rating-text-component">

                <div className="rating-text-and-info-container">


                    <h1 className="hero-title">{isLoading.page ? <Skeleton width={400} height={20} baseColor="#08283C" enableAnimation={false} /> : movieData.title} </h1>

                    <img className="rate-info-icon" src={infoIcon} onClick={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)}></img>

                </div>


                {isLoading.page ?

                    <>

                        <h1 className="hero-info" style={{ display: "none" }} >{movieData.releaseDate} · {movieData.genre} · {movieData.runtime} </h1>
                        <Skeleton className="hero-info" width={200} height={20} baseColor="#08283C" enableAnimation={false} />

                    </> :

                    <h1 className="hero-info">{movieData.releaseDate} · {movieData.genre} · {movieData.runtime} </h1>


                }

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
            {isLoading.page ?

                <>

                    <div className="hero-image-component" style={{ display: "none" }} >

                        <img className="hero-img" src={movieData.backdrop_path} onError={handleBackdropImageError} onLoad={() => { handleImageLoad("backdrop") }}></img>
                    </div>

                    <div className="hero-image-component" >


                        <Skeleton className="hero-img" height={500} width={1100} style={{ position: "inherit" }} baseColor="#08283C" enableAnimation={false} />

                    </div>

                </> :

                <div className="hero-image-component">

                    <img className="hero-img" src={movieData.backdrop_path} onError={handleBackdropImageError}></img>
                </div>}

            {isModalOpen &&

                <MovieModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)} handleToggleFavourite={() => handleToggleFavourite(authUser, setIsFavourite, isFavourite, movieData, toggleMovieFavorite)} isFavourite={isFavourite} id={movieData.id} {...props} />

            }


        </div>




    )
}
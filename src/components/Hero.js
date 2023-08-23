import React from "react";
import tmdbLogo from "../images/tmdb-logo.svg"
import MovieModal from "./MovieModal";

import { toggleMovieFavorite, isMovieFavorited } from "../firebase";

import { fetchRandomMoviesForHero, newMovieObject, toggleModal, handleBackdropImageError, handleToggleFavourite, onAuthCheckIfMovieIsFavourited } from "../utils";


import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Hero() {

    const [movieData, setMovieData] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [authUser, setAuthUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState({
        backdrop: true,
        page: true,
    });

    let showScrollBar = "";



    const handleSetMovieData = (movieInfo) => {

        const newMovie = newMovieObject(movieInfo);
        setMovieData(newMovie);
    }

    React.useEffect(() => {

        fetchRandomMoviesForHero(handleSetMovieData);

    }, [])

    React.useEffect(() => {

        onAuthCheckIfMovieIsFavourited(setAuthUser, movieData.id, setIsFavourite)

    }, [isModalOpen])

    const handleImageLoad = (key) => {

        setIsLoading((prevLoading) => ({
    
          ...prevLoading,
          [key]: false,
    
        }));
    
      };

      React.useEffect(() => {

        if(isLoading.backdrop === false){

            handleImageLoad("page");
            
           
        }else{

            setTimeout(() => {

                handleImageLoad("page");
                
            }, 5000);
        }


    }, [isLoading.backdrop]); 

    return (

        <div className="hero-component">

            <div className="hero-text-component">

                <h1 className="hero-title">{isLoading.page? <Skeleton width={400} height={"50%"} baseColor="#08283C" enableAnimation={false} /> : movieData.title} </h1>

                {isLoading.page ?

                    <>

                        <h1 className="hero-info" style={{ display: "none" }} >{movieData.releaseDate} · {movieData.genre} · {movieData.runtime} </h1>
                        <Skeleton className="hero-info" width={200} height={"50%"} baseColor="#08283C" enableAnimation={false} />

                    </> :

                    <h1 className="hero-info">{movieData.releaseDate} · {movieData.genre} · {movieData.runtime} </h1>


                }

                {

                    isLoading.page ?

                        <>

                            <div className="rating-container" style={{ display: "none" }} >

                                <img className="rating-logo rating-tmdb-logo" src={tmdbLogo} ></img>
                                <p className="rating-info tmdb-rating">{movieData.rating}</p>


                            </div>

                            <Skeleton width={300} height={20} baseColor="#08283C" enableAnimation={false} />

                        </> :

                        <div className="rating-container">

                            <img className="rating-logo rating-tmdb-logo" src={tmdbLogo} ></img>
                            <p className="rating-info tmdb-rating">{movieData.rating}</p>


                        </div>


                }



                <p className="hero-desc"> { isLoading.page? <Skeleton width={400} height={20} baseColor="#08283C" enableAnimation={false} /> : movieData.synopsis } </p>
                <button className="btn hero-more-info-btn" onClick={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)}>More Info</button>

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

                <MovieModal isModalOpen={isModalOpen} toggleModal={() => toggleModal(setIsModalOpen, isModalOpen, showScrollBar)} handleToggleFavourite={() => handleToggleFavourite(authUser, setIsFavourite, isFavourite, movieData, toggleMovieFavorite)} isFavourite={isFavourite} {...movieData} />

            }


        </div>




    )
}
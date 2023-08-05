import React from "react";
import axios from "axios";
import RateCardPoster from "../images/rate-movie-poster.png"
import tmdbConfig from "../tmdb.json";
import { formatRuntime } from "../pages/Home";
import { getRandomNumber } from "../pages/Home";
import infoIcon from "../images/info-icon.png"
import MovieModal from "./MovieModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { notifyError } from "../App";
import { toggleMovieFavorite, isMovieFavorited } from "../firebase";

export default function RateCard(props) {

    const [rateValue, setRateValue] = React.useState(0);
    const sliderRef = React.useRef(null);
    const ratingRef = React.useRef(null);
    const [movieData, setMovieData] = React.useState([]);
    const [rateCardCounter, setRateCardCounter] = React.useState(0);
    const apiKey = tmdbConfig.apiKey;
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [authUser, setAuthUser] = React.useState(null);

    const handleSliderChange = () => {
        const value = sliderRef.current.value;
        setRateValue(value);

    };

    const handleToggleFavourite = (e) => {

      

        e.stopPropagation();

        // console.log("handleToggleFavourite");
        // console.log(isFavourite);
   
        
        if(authUser === null){

            console.log("You must be logged in to perform this action!");
            notifyError("You must be logged in to perform this action!");
            return;
        }
        const tempIsFavourite = isFavourite;

        setIsFavourite(!tempIsFavourite);
        toggleMovieFavorite(authUser, movieData.id, !tempIsFavourite);

    }

    React.useEffect(() => {



        const listen = onAuthStateChanged(auth, (user) => {

            if (user) {

                const tempUserId = user.uid;
                setAuthUser(tempUserId);
                checkMovieFavorited(tempUserId, movieData.id);

            } else {
                setAuthUser(null);
            }
        })

        async function checkMovieFavorited(userId, movieId) {
            try {
              const isTempFavorite = await isMovieFavorited(userId, movieId);

            //   console.log(`isTempFavourite is: ${isTempFavorite}`)
            //   console.log(isTempFavorite);
              setIsFavourite(isTempFavorite);
            } catch (error) {
              console.error("Error occurred:", error);
            }
          }

        return () => {

            listen();
        }
    }, [])



    const handleSetMovieData = (movieInfo) => {

        const backdropPath = `https://www.themoviedb.org/t/p/original/${movieInfo.backdrop_path}`;
        const releaseDate = (movieInfo.release_date).substring(0, 4);
        const runtime = formatRuntime(movieInfo.runtime);
        const genre = movieInfo.genres[0].name;


        const newMovie = {
            id: movieInfo.id,
            title: movieInfo.original_title,
            releaseDate: releaseDate,
            runtime: runtime,
            backdrop_path: backdropPath,
            genre: genre,
        };

        setMovieData(newMovie);
        // console.log(newMovie);
    }

    React.useEffect(() => {

        const fetchData = async () => {
            try {

                let randomNumber = getRandomNumber(1000, 1);

                const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${randomNumber}?api_key=${apiKey}`);
                const castInfo = await axios.get(`https://api.themoviedb.org/3/movie/${randomNumber}/credits?api_key=${apiKey}`);

                // Assuming both APIs return data in the form of { data: ... }
                const responseMovieInfo = movieInfo.data;
                const responseCastInfo = castInfo.data;

                // Merge the data from both responses into the same object
                const mergedData = {
                    ...responseMovieInfo,
                    ...responseCastInfo,
                };

                handleSetMovieData(mergedData)
            } catch (error) {
                // Handle any errors that may occur during the API calls
                console.error('Error fetching data:', error);


                // if (error.response.status === 404) {

                //     return fetchData(Math.random() * (10000 - 1) + 1);

                // }


            }
        };

        fetchData();

    }, [rateCardCounter]);

    const incrementRateCardCounter = () => {

        setRateCardCounter(rateCardCounter + 1);
    }

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    let showScrollBar = "";

    const toggleModal = () => {

        setIsModalOpen(!isModalOpen);
        isModalOpen ? showScrollBar = "" : showScrollBar = "hidden";

        document.body.style.overflow = showScrollBar;


    }


    return (

        <div className="hero-component rate-component">

            <div className="rating-text-component">

                <div className="rating-text-and-info-container">

                    <h2 className="hero-title">{movieData.title}</h2>
                    <img className="rate-info-icon" src={infoIcon} onClick={ toggleModal }></img>

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

                <MovieModal isModalOpen={isModalOpen} toggleModal={toggleModal} handleToggleFavourite={handleToggleFavourite} isFavourite={isFavourite} id={ movieData.id} {...props} />

            }


        </div>




    )
}
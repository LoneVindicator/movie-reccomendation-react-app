import React from "react";
import axios from "axios";
import RateCardPoster from "../images/rate-movie-poster.png"
import tmdbConfig from "../tmdb.json";
import { formatRuntime } from "../pages/Home";
import { getRandomNumber } from "../pages/Home";
import infoIcon from "../images/info-icon.png"
import MovieModal from "./MovieModal";


export default function RateCard() {

    const [rateValue, setRateValue] = React.useState(0);
    const sliderRef = React.useRef(null);
    const ratingRef = React.useRef(null);
    const [movieData, setMovieData] = React.useState([]);
    const [rateCardCounter, setRateCardCounter] = React.useState(0);
    const apiKey = tmdbConfig.apiKey;


    const handleSliderChange = () => {
        const value = sliderRef.current.value;
        setRateValue(value);

    };



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

                <MovieModal isModalOpen={isModalOpen} toggleModal={toggleModal} id={movieData.id} />

            }


        </div>




    )
}
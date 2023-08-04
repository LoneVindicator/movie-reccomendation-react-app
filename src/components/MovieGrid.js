import React from "react";
import ReactDOM from "react-dom"
import axios from "axios";
import tmdbConfig from "../tmdb.json"
import MovieCard from "./MovieCard";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination';

// import required modules

import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function MovieGrid(props) {

    const [movieData, setMovieData] = React.useState([]);
    const apiKey = tmdbConfig.apiKey;

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

        // const randNumArray = props.randNumArray;
        const nowPlaying = true;
        const listSelector = "popular";

        if (nowPlaying === true) {

            const fetchData = async () => {
                try {
                    const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${listSelector}?api_key=${apiKey}`);

                    // Assuming both APIs return data in the form of { data: ... }
                    const responseMovieInfo = movieInfo.data.results;

                    // Merge the data from both responses into the same object
                    const mergedData = responseMovieInfo;

                    handleSetMovieData(mergedData);
                } catch (error) {
                    // Handle any errors that may occur during the API calls
                    console.error('Error fetching data:', error);
                    return null; // Or handle the error appropriately
                }
            };

            fetchData();

            return;

        }



    }, []);

    return ReactDOM.createPortal(

        <div className="movie-modal-overlay" onClick={props.toggleMovieGridModal}>

            <div className="movie-grid-modal-content" onClick={(e) => e.stopPropagation()}>

                <h1 className="movie-grid-modal-title">Test Grid Modal</h1>

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
        
                            />
                        </div>
                    ))}
                </div>



            </div>



        </div>,

        document.getElementById("portal")


    )



}
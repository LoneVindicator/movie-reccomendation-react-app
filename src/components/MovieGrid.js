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

// TODO: 

// 1. Separate MovieGrid into two modals; CastGrid, FavouriteGrid
// 2. Implement CastGrid  
// 3. Make search better
// 4. Filter by category
// 5. Refactor

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

        const favouriteMovieArr = props.favouriteMovieArr;
        const castId = props.castId;

        if(favouriteMovieArr != null ){

            const fetchData = async (index) => {
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
          
          
          
                  return mergedData;
                } catch (error) {
                  // Handle any errors that may occur during the API calls
                  console.error('Error fetching data:', error);
          
                  if (error.response.status === 404) {
          
                    return fetchData(Math.random() * (1000 - 1) + 1);
          
                  }
          
                  return null; // Or handle the error appropriately
                }
              };
          
              const fetchAllData = async () => {
                const mergedDataArray = [];
          
                for (const index of favouriteMovieArr) {
                  const mergedData = await fetchData(index);
                  if (mergedData) {
                    mergedDataArray.push(mergedData);
                  }
                }
          
          
                handleSetMovieData(mergedDataArray);
              };
          
              fetchAllData();
        }

            const fetchData = async () => {
                try {
                    // const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${listSelector}?api_key=${apiKey}`);
                    const movieInfo = await axios.get(`https://api.themoviedb.org/3/person/${castId}/movie_credits?api_key=${apiKey}&sort_by=release_date.desc`);


                    // Assuming both APIs return data in the form of { data: ... }
                    const responseMovieInfo = movieInfo.data.cast.slice(0, 30);

                    // console.log("MOVIE GRID CAST API")
                    // console.log(responseMovieInfo);

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

    }, []);

    return ReactDOM.createPortal(

        <div className="movie-modal-overlay" onClick={props.toggleMovieGridModal}>

            <div className="movie-grid-modal-content" onClick={(e) => e.stopPropagation()}>

                <h1 className="movie-grid-modal-title">{props.favouriteMovieArr? `Your Favourites`: `${props.name}'s Movies`}</h1>

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
                                {... props}
        
                            />
                        </div>
                    ))}
                </div>



            </div>



        </div>,

        document.getElementById("portal")


    )



}
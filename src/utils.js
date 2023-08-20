import axios from "axios";
import tmdbConfig from "./tmdb.json"
import noBackdrop from "./images/backdrop-no-img.png"
import { notifyError } from "./App";
import { auth, isMovieFavorited } from "./firebase";

const apiKey = tmdbConfig.apiKey;



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

function getRandomNumber(max, min) {

    return Math.random() * (max - min) + min;
}


function fetchRandomMoviesForHero(handleSetMovieData) {

    const fetchData = async () => {
        try {

            let randomNumber = getRandomNumber(10000, 1);


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

            handleSetMovieData(mergedData);

        } catch (error) {
            // Handle any errors that may occur during the API calls
            console.error('Error fetching data:', error);

        }
    };

    fetchData();


}

function newMovieObject(movieInfo) {

    const posterPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieInfo.poster_path}`;
    const backdropPath = `https://www.themoviedb.org/t/p/original/${movieInfo.backdrop_path}`;
    const releaseDate = (movieInfo.release_date).substring(0, 4);
    const runtime = formatRuntime(movieInfo.runtime);
    const rating = movieInfo.vote_average.toFixed(1);
    const genre = movieInfo.genres[0].name;

    const movieObject = {
        id: movieInfo.id,
        title: movieInfo.original_title,
        synopsis: movieInfo.overview,
        releaseDate: releaseDate,
        runtime: runtime,
        rating: rating,
        genre: genre,
        cast: movieInfo.cast,
        poster_path: posterPath,
        backdrop_path: backdropPath,
    };

    return movieObject
}

const toggleModal = (setIsModalOpen, isModalOpen, showScrollBar) => {

    setIsModalOpen(!isModalOpen);
    isModalOpen ? showScrollBar = "" : showScrollBar = "hidden";

    document.body.style.overflow = showScrollBar;


}

const handleImageError = (e) => {
    e.target.src = noBackdrop;
};


const handleToggleFavourite = (authUser, setIsFavourite, isFavourite, movieData, toggleMovieFavorite) => {


    // console.log("handleToggleFavourite");
    // console.log(isFavourite);


    if (authUser === null) {

        console.log("You must be logged in to perform this action!");
        notifyError("You must be logged in to perform this action!");
        return;
    }
    const tempIsFavourite = isFavourite;

    setIsFavourite(!tempIsFavourite);
    toggleMovieFavorite(authUser, movieData.id, !tempIsFavourite);

}



function onAuthCheckIfMovieIsFavourited(setAuthUser, movieId, setIsFavourite) {

    let tempUserId = null;

    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, update the state with the current user

            tempUserId = user.uid
            setAuthUser(tempUserId);
            //   console.log(`movie id: ${props.id}, user id: ${tempUserId}`)
            checkMovieFavorited(tempUserId, movieId, setIsFavourite, isMovieFavorited);

        } else {
            // User is signed out, set the state to null

            setAuthUser(null);
        }
    });

    async function checkMovieFavorited(userId, movieId, setIsFavourite, isMovieFavorited) {
        try {
            const isTempFavorite = await isMovieFavorited(userId, movieId);

            //   console.log(`isTempFavourite is: ${isTempFavorite}`)
            //   console.log(isTempFavorite);
            setIsFavourite(isTempFavorite);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }
}

function fetchMovieInfo( movieId, handleSetMovieData ) {

    const fetchData = async () => {
        try {

            const movieInfo = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
            const castInfo = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);

            // Assuming both APIs return data in the form of { data: ... }
            const responseMovieInfo = movieInfo.data;
            const responseCastInfo = castInfo.data;

            // Merge the data from both responses into the same object
            const mergedData = {
                ...responseMovieInfo,
                ...responseCastInfo,
            };

            handleSetMovieData(mergedData);

        } catch (error) {
            // Handle any errors that may occur during the API calls
            console.error('Error fetching data:', error);

        }
    };

    fetchData();


}

const handleBackdropError = (e) => {
    e.target.src = noBackdrop;
};


export { formatRuntime, getRandomNumber, fetchRandomMoviesForHero, newMovieObject, toggleModal, handleImageError, handleToggleFavourite, onAuthCheckIfMovieIsFavourited, fetchMovieInfo, handleBackdropError };

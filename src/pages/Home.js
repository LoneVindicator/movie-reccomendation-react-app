import React from "react";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel";
import Footer from "../components/Footer"
import tmdbConfig from "../tmdb.json"
import { formatRuntime, getRandomNumber, fetchRandomMoviesForCarousel, handleSetMovieData } from "../utils";
import axios from "axios";


import { register } from 'swiper/element/bundle';
import RateCard from "../components/RateCard";







function Home(props) {

    //Variables

    const [movieData, setMovieData] = React.useState([]);
    const apiKey = tmdbConfig.apiKey;

    //Get Random numbers for the reccomendation & newToYou carousel slide

    const reccomendationsRandNumArray = Array(10).fill().map(() => getRandomNumber(10000, 1));
    const newToYouRandNumArray = Array(10).fill().map(() => getRandomNumber(10000, 1));

    //SwiperJS Boilerplate

    // register Swiper custom elements
    register();



    const handleSetMovieData = (movieInfo) => {

        const posterPath = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieInfo.poster_path}`;
        const backdropPath = `https://www.themoviedb.org/t/p/original/${movieInfo.backdrop_path}`;
        const releaseDate = (movieInfo.release_date).substring(0, 4);
        const runtime = formatRuntime(movieInfo.runtime);
        const rating = movieInfo.vote_average.toFixed(1);
        const genre = movieInfo.genres[0].name;

        const newMovie = {
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

        setMovieData(newMovie);
    }






    React.useEffect(() => {

        fetchRandomMoviesForCarousel(axios, apiKey, handleSetMovieData);

    }, [])

    return (



        <div className="header-page-container">

            <Navbar {...props} />
            <Hero

                id={movieData.id}
                title={movieData.title}
                posterPath={movieData.poster_path}
                backdropPath={movieData.backdrop_path}
                synopsis={movieData.synopsis}
                runtime={movieData.runtime}
                rating={movieData.rating}
                genre={movieData.genre}
                releaseDate={movieData.releaseDate}
                cast={movieData.cast}

            />

            <Carousel carouselTitle="Reccomendations" randNumArray={reccomendationsRandNumArray} nowPlaying={false} />
            <Carousel carouselTitle="New Releases" randNumArray={null} nowPlaying={true} listSelector={"now_playing"} />
            <RateCard />
            <Carousel carouselTitle="Similar to Donnie Darkko" randNumArray={[489, 991, 941, 817, 836, 193, 891, 138, 202, 756]} nowPlaying={false} />
            <Carousel carouselTitle="Popular right now" nowPlaying={true} listSelector={"popular"} />
            <Carousel carouselTitle="New to you" randNumArray={newToYouRandNumArray} nowPlaying={false} />
            <Footer />

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        </div>




    )
}

export default Home;
export { formatRuntime, getRandomNumber };
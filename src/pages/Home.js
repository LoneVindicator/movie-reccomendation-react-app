import React from "react";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel";
import Footer from "../components/Footer"
import tmdbConfig from "../tmdb.json"

import { register } from 'swiper/element/bundle';
import RateCard from "../components/RateCard";


import axios from "axios";

export default function Home(props) {

    const [movieData, setMovieData] = React.useState([]);
    const apiKey = tmdbConfig.apiKey;


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
        // console.log(newMovie);
    }






    //TMDB API FOR HERO

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

    }, [])

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



    // register Swiper custom elements
    register();

    const reccomendationsRandNumArray = Array(10).fill().map(() => getRandomNumber(10000, 1));
    const newToYouRandNumArray = Array(10).fill().map(() => getRandomNumber(10000, 1));

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
            <Carousel carouselTitle="Similar to Donnie Darkko" randNumArray={[489, 991, 941, 817, 836, 193, 891, 138, 202, 756]} nowPlaying={false}/>
            <Carousel carouselTitle="Popular right now" nowPlaying={true} listSelector={"popular"} />
            <Carousel carouselTitle="New to you" randNumArray={newToYouRandNumArray} nowPlaying={false} />
            <Footer />

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        </div>




    )
}
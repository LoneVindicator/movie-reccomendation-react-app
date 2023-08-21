import React from "react";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel";
import Footer from "../components/Footer"

import { formatRuntime, getRandomNumber, fetchRandomMoviesForHero, newMovieObject } from "../utils";

import { register } from 'swiper/element/bundle';
import RateCard from "../components/RateCard";







function Home(props) {

    //Variables

    const [movieData, setMovieData] = React.useState([]);

    //Get Random numbers for the reccomendation & newToYou carousel slide

    const reccomendationsRandNumArray = Array(10).fill().map(() => getRandomNumber(10000, 1));
    const newToYouRandNumArray = Array(10).fill().map(() => getRandomNumber(10000, 1));

    //SwiperJS Boilerplate

    // register Swiper custom elements
    register();



    const handleSetMovieData = (movieInfo) => {

        const newMovie = newMovieObject(movieInfo);
        setMovieData(newMovie);
    }






    React.useEffect(() => {

        fetchRandomMoviesForHero(handleSetMovieData);

    }, [])

    return (



        <div className="header-page-container">

            <Navbar {...props} />
            <Hero />

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
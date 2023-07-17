import React from "react";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel";
import Footer from "../components/Footer"

import { register } from 'swiper/element/bundle';
import RateCard from "../components/RateCard";

export default function Home() {


    // register Swiper custom elements
    register();

    return (



        <div className="header-page-container">

            <Navbar />
            <Hero />
            <Carousel carouselTitle = "Reccomendations"/>
            <Carousel carouselTitle = "New Releases"/>
            <RateCard />
            <Carousel carouselTitle = "Similar to Donnie Darkko"/>
            <Carousel carouselTitle = "Popular right now"/>
            <Carousel carouselTitle = "New to you"/>
            <Footer/>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        </div>




    )
}
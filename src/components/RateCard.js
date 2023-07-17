import React from "react";

import RateCardPoster from "../images/rate-movie-poster.png"

export default function RateCard() {

    return (

        <div className="hero-component">

            <div className="hero-text-component">

                <h2 className="hero-title">The Lego Movie</h2>
                <h1 className="hero-info">PG-13 · 2014 · 1h 40m </h1>
                <div className="rate-count-container-el">

                    <h1 className="rate-count-el">0%</h1>
                    <h1 className="rate-count-prompt">Drag the slider to rate the movie</h1>


                </div>


                <button className="btn submit-btn">Submit</button>
                <button className="btn seen-btn">Haven't Seen</button>

            </div>
            <div className="hero-image-component">

                <img className="hero-img" src={RateCardPoster}></img>
            </div>


        </div>




    )
}
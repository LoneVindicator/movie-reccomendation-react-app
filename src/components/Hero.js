import React from "react";

import heroImgOne from "../images/hero-img-one.png"

export default function Hero() {

    return (

        <div className="hero-component">

            <div className="hero-text-component">

                <h2 className="hero-title">Batman Begins</h2>
                <h1 className="hero-info">TV-MA · 2004 · 1h 35m </h1>
                <p className="hero-desc">
                    After witnessing his parents' death, Bruce learns the art of fighting to confront injustice. 
                    When he returns to Gotham as Batman, he must stop a secret society that intends to destroy the city.
                </p>
                <button className="btn hero-more-info-btn">More Info</button>

            </div>
            <div className="hero-image-component">

                <img className="hero-img" src={heroImgOne}></img>
            </div>

        
        </div>




    )
}
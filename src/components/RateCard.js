import React from "react";
import RateCardPoster from "../images/rate-movie-poster.png"

export default function RateCard() {

    const [rateValue, setRateValue] = React.useState(0);
    const sliderRef = React.useRef(null);
    const ratingRef = React.useRef(null);

    const handleSliderChange = () => {
        const value = sliderRef.current.value;
        setRateValue(value);

    };


    return (

        <div className="hero-component">

            <div className="rating-text-component">

                <h2 className="hero-title">The Lego Movie</h2>
                <h1 className="hero-info">PG-13 · 2014 · 1h 40m </h1>
                <div className="rate-count-container-el">

                    <h1 className="rate-count-el">{rateValue}%</h1>
                    <input className="rate-count-slider" type="range" min="0" max="100" ref={sliderRef} value={rateValue} onChange={handleSliderChange}></input>
                    <h1 className="rate-count-prompt">Drag the slider to rate the movie</h1>


                </div>


                <button className="btn submit-btn">Submit</button>
                <button className="btn seen-btn">Haven't Seen</button>

            </div>
            <div className="hero-image-component">

                <img className="hero-img" src={RateCardPoster} loading="lazy"></img>
            </div>


        </div>




    )
}
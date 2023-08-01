import React from "react";
import tmdbLogo from "../images/tmdb-logo.svg"
import MovieModal from "./MovieModal";
import noBackdrop from "../images/backdrop-no-img.png"

export default function Hero(props) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    let showScrollBar = "";

    const toggleModal = () => {

        setIsModalOpen(!isModalOpen);
        isModalOpen ? showScrollBar = "" : showScrollBar = "hidden";

        document.body.style.overflow = showScrollBar;


    }

    const handleImageError = (e) => {
        e.target.src = noBackdrop;
      };


    return (

        <div className="hero-component">

            <div className="hero-text-component">

                <h2 className="hero-title">{props.title}</h2>
                <h1 className="hero-info">{props.releaseDate} · {props.genre} · {props.runtime} </h1>

                <div className="rating-container">

                    <img className="rating-logo rating-tmdb-logo" src={tmdbLogo} ></img>
                    <p className="rating-info tmdb-rating">{props.rating}</p>


                </div>

                <p className="hero-desc">{props.synopsis}</p>
                <button className="btn hero-more-info-btn" onClick={toggleModal}>More Info</button>

            </div>
            <div className="hero-image-component">

                <img className="hero-img" src={props.backdropPath} onError={ handleImageError }></img>
            </div>

            {isModalOpen &&

                <MovieModal isModalOpen={isModalOpen} toggleModal={toggleModal} {...props} />

            }


        </div>




    )
}
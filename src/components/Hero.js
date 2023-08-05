import React from "react";
import tmdbLogo from "../images/tmdb-logo.svg"
import MovieModal from "./MovieModal";
import noBackdrop from "../images/backdrop-no-img.png"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { notifyError } from "../App";
import { toggleMovieFavorite, getFavoriteMovieIds } from "../firebase";

export default function Hero(props) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [authUser, setAuthUser] = React.useState(null);
    

    let showScrollBar = "";

    const toggleModal = () => {

        setIsModalOpen(!isModalOpen);
        isModalOpen ? showScrollBar = "" : showScrollBar = "hidden";

        document.body.style.overflow = showScrollBar;


    }

    const handleToggleFavourite = (e) => {

      

        e.stopPropagation();

        // console.log("handleToggleFavourite");
        // console.log(isFavourite);
   
        
        if(authUser === null){

            console.log("You must be logged in to perform this action!");
            notifyError("You must be logged in to perform this action!");
            return;
        }
        const tempIsFavourite = isFavourite;

        setIsFavourite(!tempIsFavourite);
        toggleMovieFavorite(authUser, props.id, !tempIsFavourite);

    }

    React.useEffect(() => {



        const listen = onAuthStateChanged(auth, (user) => {

            if (user) {

                const tempUserId = user.uid;

                setAuthUser(tempUserId);

            } else {
                setAuthUser(null);
            }
        })

        return () => {

            listen();
        }
    }, [])

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

                <MovieModal isModalOpen={isModalOpen} toggleModal={toggleModal} handleToggleFavourite={handleToggleFavourite} isFavourite={isFavourite} {...props}/>

            }


        </div>




    )
}
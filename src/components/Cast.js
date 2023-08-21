import React from "react";
import MovieGrid from "./MovieGrid";
import { handleImageError } from "../utils";

export default function Cast(props) {

    const [isMovieGridModalOpen, setIsMovieGridModalOpen] = React.useState(false);

    const toggleMovieGridModal = () => {

        setIsMovieGridModalOpen(!isMovieGridModalOpen);

    }


    return (

        <div className="modal-cast-member-container" onClick={ toggleMovieGridModal }>

            <div className="modal-cast-photo-container">

                <img className="modal-cast-photo" src={props.profilePath} onError={handleImageError} loading="lazy" ></img>


            </div>

            <div className="modal-cast-text-container">

                <p className="modal-cast-actor-name">{props.name}</p>
                <p className="modal-cast-character-name">{props.character}</p>


            </div>

            {isMovieGridModalOpen &&

                <MovieGrid isMovieGridModalOpen={isMovieGridModalOpen} toggleMovieGridModal={toggleMovieGridModal} { ...props }/>

            }

        </div>


    )
}
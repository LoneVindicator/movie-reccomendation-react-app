import React from "react";
import noImg from "../images/cast-no-img.png"

export default function Cast(props) {

    const handleImageError = (e) => {
        e.target.src = noImg;
      };

    return (

        <div className="modal-cast-member-container">

            <div className="modal-cast-photo-container">

                <img className="modal-cast-photo" src={props.profilePath} onError={ handleImageError} loading="lazy"></img>


            </div>

            <div className="modal-cast-text-container">

                <p className="modal-cast-actor-name">{props.name}</p>
                <p className="modal-cast-character-name">{props.character}</p>


            </div>

        </div>


    )
}
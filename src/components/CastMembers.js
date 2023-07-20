import React from "react";

export default function CastMembers(props) {

    return (

        <div className="modal-cast-member-container">

            <div className="modal-cast-photo-container">

                <img className="modal-cast-photo" src={props.photo}></img>


            </div>
            
            <div className="modal-cast-text-container">

            <p className="modal-cast-actor-name">{props.name}</p>


            </div>

        </div>


    )
}
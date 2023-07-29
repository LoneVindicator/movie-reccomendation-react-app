import React from "react"
import ReactDOM from "react-dom"
import CastMembers from "./CastMembers"

export default function MovieModal(props) {

    console.log("MovieModal has been opened")

    return ReactDOM.createPortal(

        <div className="movie-modal-overlay" onClick={props.toggleModal}>

            <div className="movie-modal-content" onClick={(e) => e.stopPropagation()}>


                <div className="modal-image-container">

                    <img className="modal-image-poster" src={props.landscapeImgLink}></img>


                </div>

                <div className="modal-bottom-container">

                    <div className="modal-info-container">

                        <div className="modal-poster-container">


                            <img className="modal-poster" src={props.imgLink}></img>
                            <button className="btn watch-trailer-btn">Watch Trailer</button>

                        </div>

                        <div className="modal-text-container">

                            <h1 className="modal-text-movie-name">{props.movieName}</h1>
                            <h1 className="modal-text-movie-info">TV-MA · 1995 · 2h 34m </h1>
                            <h1 className="modal-text-movie-desc">{props.desc}</h1>

                        </div>

                        <div className="modal-cast-container">

                            <h1 className="modal-cast-title">Cast</h1>

                            {props.castMembers.map((castMember, index) => (

                                <CastMembers

                                    key={index}
                                    name={castMember.name}
                                    photo={castMember.photo}
                                >

                                </CastMembers>
                            ))}

                        </div>



                    </div>

                </div>

            </div>


        </div>,

        document.getElementById("portal")
    )
}
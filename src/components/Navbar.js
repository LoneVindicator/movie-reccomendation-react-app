import React from "react";
import userIcon from "../images/user-icon.png"
import searchIcon from "../images/search-icon.png"

export default function Home() {

    return (

        <nav>

            <div className="nav-item">

                
                <img src={searchIcon} className="nav-icon-img"></img>


            </div>

            <div className="nav-item">

            <img src={userIcon} className="nav-icon-img"></img>

            



            </div>
        </nav>


    )
}
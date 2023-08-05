import React from "react";
import userIcon from "../images/user-icon.png";
import logoutIcon from "../images/logout-icon.png";

import LoginModal from "../components/LoginModal";
import RegistrationModal from "../components/RegistrationModal";

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaHeart } from "react-icons/fa6";
import axios from "axios";
import { getFavoriteMovieIds, isMovieFavorited, toggleMovieFavorite } from "../firebase";
import MovieGrid from "./MovieGrid";

import 'react-toastify/dist/ReactToastify.css';
import tmdbConfig from "../tmdb.json"
import MovieModal from "./MovieModal";
import { notifyError } from "../App";

export default function Navbar(props) {

    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
    const apiKey = tmdbConfig.apiKey;
    const [movieId, setMovieId] = React.useState(null);
    const [query, setQuery] = React.useState("");
    const [favouriteMovieArr, setFavoriteMovieArr] = React.useState(null);
    const [isFavourite, setIsFavourite] = React.useState(false);
    
    const toggleLoginModal = () => {

        setIsLoginModalOpen(!isLoginModalOpen);
        handleIsRegistrationModalOpen(false);

    }


    const handleToggleFavourite = (e) => {



        e.stopPropagation();

        // console.log("handleToggleFavourite");
        // console.log(isFavourite);


        if (authUser === null) {

            console.log("You must be logged in to perform this action!");
            notifyError("You must be logged in to perform this action!");
            return;
        }
        const tempIsFavourite = isFavourite;

        setIsFavourite(!tempIsFavourite);
        toggleMovieFavorite(authUser, movieId, !tempIsFavourite);

    }

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = React.useState(false);

    const handleIsRegistrationModalOpen = (bool) => {

        setIsRegistrationModalOpen(bool);

    }

    const [isMovieGridModalOpen, setIsMovieGridModalOpen] = React.useState(false);

    const toggleMovieGridModal = () => {

        if (authUser === null) {

            notifyError("You must be logged in to perform this action");
            return;
        }

        setIsMovieGridModalOpen(!isMovieGridModalOpen);

    }


    const [authUser, setAuthUser] = React.useState(null);

    React.useEffect(() => {



        const listen = onAuthStateChanged(auth, (user) => {

            if (user) {

                const tempUserId = user.uid;

                setAuthUser(tempUserId);
                getFavoriteMovieIds(tempUserId).then((favourites) => {
                    console.log("show me favourites");
                    setFavoriteMovieArr(favourites);
                    
                });

            } else {
                setAuthUser(null);
            }
        })

        return () => {

            listen();
        }
    }, [favouriteMovieArr])

    const userSignOut = () => {

        signOut(auth).then(() => {
            console.log('signed out successfully');
            props.notifySuccess("You're Signed Out");

        }).catch(error => {

            console.log(error)


        })
    }

    //Search Movie

    const searchMovie = (e) => {

        e.preventDefault()

        const fetchData = async () => {
            try {
                const searchResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);

                // Assuming both APIs return data in the form of { data: ... }
                const responseSearchResults = searchResults.data.results[0].id;

                // Merge the data from both responses into the same object
                const mergedData = responseSearchResults

                setMovieId(mergedData);
                checkMovieFavorited(authUser, mergedData)
                setIsModalOpen(true);
                setQuery("");
            } catch (error) {
                // Handle any errors that may occur during the API calls
                console.error('Error fetching data:', error);
                notifyError("No results found");
                setQuery("");
                return null; // Or handle the error appropriately
            }
        };

        fetchData();

        async function checkMovieFavorited(userId, movieId) {
            try {
                const isTempFavorite = await isMovieFavorited(userId, movieId);

                //   console.log(`isTempFavourite is: ${isTempFavorite}`)
                //   console.log(isTempFavorite);
                setIsFavourite(isTempFavorite);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }

        return;




    }

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    let showScrollBar = "";

    const toggleModal = () => {

        setIsModalOpen(!isModalOpen);
        isModalOpen ? showScrollBar = "" : showScrollBar = "hidden";

        document.body.style.overflow = showScrollBar;


    }




    return (

        <nav>

            <div className="nav-item search-nav-item">

                <form onSubmit={searchMovie}>

                    <input type="text" placeholder="Search Movie" id="query" value={query} onChange={(e) => setQuery(e.target.value)}></input>

                </form>


            </div>

            <div className="nav-item favourites-nav-item">

                <FaHeart className="nav-icon-img" onClick={toggleMovieGridModal} />

            </div>

            {authUser ?

                //Logged In

                <div className="nav-item nav-login-item" onClick={userSignOut} >


                    <img src={logoutIcon} className="nav-icon-img" ></img>








                </div> :

                //Logged Out



                <div className="nav-item" onClick={toggleLoginModal}>

                    <img src={userIcon} className="nav-icon-img" ></img>

                </div>

            }



            {isLoginModalOpen &&

                <>

                    {!isRegistrationModalOpen && <LoginModal toggleLoginModal={toggleLoginModal} handleIsRegistrationModalOpen={handleIsRegistrationModalOpen} {...props} />}
                    {isRegistrationModalOpen && <RegistrationModal toggleLoginModal={toggleLoginModal} handleIsRegistrationModalOpen={handleIsRegistrationModalOpen} {...props} />}


                </>






            }

            {isModalOpen &&

                <MovieModal isModalOpen={isModalOpen} toggleModal={toggleModal} id={movieId} handleToggleFavourite={handleToggleFavourite} isFavourite={isFavourite} {...props} />

            }


            {isMovieGridModalOpen &&


                <MovieGrid isMovieGridModalOpen={isMovieGridModalOpen} toggleMovieGridModal={toggleMovieGridModal} favouriteMovieArr={favouriteMovieArr} {...props} />

            }


        </nav>


    )
}
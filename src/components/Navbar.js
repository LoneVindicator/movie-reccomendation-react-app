import React from "react";
import userIcon from "../images/user-icon.png";
import searchIcon from "../images/search-icon.png";
import logoutIcon from "../images/logout-icon.png";

import LoginModal from "../components/LoginModal";
import RegistrationModal from "../components/RegistrationModal";

import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar(props) {

    const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);

    const toggleLoginModal = () => {

        setIsLoginModalOpen(!isLoginModalOpen);
        handleIsRegistrationModalOpen(false);

    }

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = React.useState(false);

    const handleIsRegistrationModalOpen = (bool) => {

        setIsRegistrationModalOpen(bool);

    }

    const [authUser, setAuthUser] = React.useState(null);

    React.useEffect(() => {

        const listen = onAuthStateChanged(auth, (user) => {

            if (user) {

                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        })

        return () => {

            listen();
        }
    }, [])

    const userSignOut = () => {

        signOut(auth).then(() => {
            console.log('signed out successfully');
            props.notifySuccess("You're Signed Out");
            
        }).catch(error => {

            console.log(error)
            

        })
    }




    return (

        <nav>

            <div className="nav-item">


                <img src={searchIcon} className="nav-icon-img"></img>


            </div>

            {authUser ?

                //Logged In

                <div className="nav-item" onClick={userSignOut} >


                    <img src={logoutIcon} className="nav-icon-img" ></img>








                </div> :

                //Logged Out



                <div className="nav-item" onClick={toggleLoginModal}>

                    <img src={userIcon} className="nav-icon-img" ></img>

                </div>

            }



            {isLoginModalOpen &&

                <>

                    {!isRegistrationModalOpen && <LoginModal toggleLoginModal={toggleLoginModal} handleIsRegistrationModalOpen={handleIsRegistrationModalOpen} { ...props }/>}
                    {isRegistrationModalOpen && <RegistrationModal toggleLoginModal={toggleLoginModal} handleIsRegistrationModalOpen={handleIsRegistrationModalOpen} { ...props } />}


                </>






            }


        </nav>


    )
}
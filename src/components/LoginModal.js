import React from "react"
import ReactDOM from "react-dom"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


export default function LoginModal(props) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signIn = (e) => {

        console.log("signIn ran!")

        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // console.log(userCredential);
            props.toggleLoginModal();
            props.notifySuccess("Login successful");

        }).catch((error) => {

            console.log(error);
            props.notifyError("Wrong Username/Password");
        })

    }
    

    return ReactDOM.createPortal(

        <div className="movie-modal-overlay" onClick={props.toggleLoginModal}>
           
           <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="login-content-container">

                    <h1 className="login-form-prompt">Login</h1>

                    <div className="social-links">

                        <i className="fa fa-twitter-square"></i>
                        <i className="fa fa-google"></i>
                        <i className="fa fa-apple"></i>
                        <i className="fa fa-facebook-square"></i>

                    </div>

                    <form className="login-form" onSubmit={signIn}>

                        <input type="text" className="login-input-form" id="username" name="username" placeholder="Email or Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" className="login-input-form" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" className="login-btn">Log In</button>




                    </form>

                    <div className="login-prompt-container">

                        <p className="firstText">New user?</p>
                        <p className="secondText" onClick={() => props.handleIsRegistrationModalOpen(true)}>Register Here</p>


                    </div>




                </div>

            </div>

           

        </div>,

        document.getElementById("portal")
    )
}
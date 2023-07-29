import React from "react"
import ReactDOM from "react-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegistrationModal(props) {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const registerAccount = (e) => {

        console.log("register ran!")

        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            console.log(userCredential);
            props.handleIsRegistrationModalOpen(false);
            props.notifySuccess("Registration successful");
        }).catch((error) => {

            console.log(error);
            props.notifyError("Registration failed: Check password length and email");
        })

    }

    return ReactDOM.createPortal(


        <div className="movie-modal-overlay" onClick={props.toggleLoginModal}>



            <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="login-content-container">

                    <h1 className="login-form-prompt">Registration</h1>

                    <div className="social-links">

                        <i className="fa fa-twitter-square"></i>
                        <i className="fa fa-google"></i>
                        <i className="fa fa-apple"></i>
                        <i className="fa fa-facebook-square"></i>

                    </div>

                    <form className="login-form" onSubmit={registerAccount}>

                        <input type="text" className="login-input-form" id="username" name="username" placeholder="Email or Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" className="login-input-form" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" className="login-btn">Register</button>




                    </form>

                    <div className="login-prompt-container">

                        <p className="firstText">Already have an account?</p>
                        <p className="secondText" onClick={() => props.handleIsRegistrationModalOpen(false)}>Login Here</p>


                    </div>


                </div>

            </div>

        </div>,

        document.getElementById("portal")
    )
}
import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";


export default function AuthDetails() {

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
        }).catch(error => console.log(error))
    }

    return (

        <></>

        // <div className="nav-item">

        //     <img src={userIcon} className="nav-icon-img" onClick={userSignOut}></img>



        //     { authUser? <> <p> {`Signed In as ${authUser.email}`} </p> <button>Sign Out</button>  </>: <p> Signed Out </p> }
        



        // </div>



    )


}
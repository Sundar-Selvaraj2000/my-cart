import React, { useEffect, useState } from "react";
import '../Assets/Login.css'
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigation = useNavigate();
    const [userDetails, setUserDetails] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPaaword] = useState('')
    const [loggedInUser, setLoggedInUserData] = useState([])

    useEffect(() => {
        let array = (JSON.parse(localStorage.getItem('userData')))
        console.log("Details ", array)
        setUserDetails(array ?? [])
       
    }, [])

    const nameFunction = (u) => {
        setEmail(u.target.value)
    }

    const passwordFunction = (password) => {
        setPaaword(password.target.value)
    }

    const registerFunction = () => {
        navigation('/Registration')
    }

    const loginFunction = () => {
        // let user = [...userDetails]
        // console.log("userName" , userName)
        console.log('username', email)
        console.log('password', password)
        let loggedArray = localStorage.getItem('loggedInUserData')
        console.log('loggggg', loggedArray)
        if (!loggedArray) {
            loggedArray = {}
        }
        else {
            loggedArray = JSON.parse(loggedArray)
        }
        
        var cartIndex = userDetails.findIndex(x => (x.email).toLowerCase() === (email.toLowerCase()))
        if ((cartIndex != -1) && ((userDetails[cartIndex].password) === password)) {
            let loggedUserData = userDetails[cartIndex]
            loggedArray = loggedUserData
            console.log('loggedInUserData', loggedArray)
            localStorage.setItem('loggedInUserData', JSON.stringify(loggedArray))
            navigation('/MyCart')
        }
        else if (cartIndex === -1) {
            alert("User Not found")
        }
        
        else {
            alert("Invalid Credentials")
        }
    }

    return (
        <div className="basecontainer">
            <div className="login">
                <p>Email</p>
                <input type="text" placeholder="Email" onChange={nameFunction} />
                <p>Password</p>
                <input type="password" placeholder="Password" onChange={passwordFunction} />
                <span className="login-button" onClick={loginFunction}><button >
                    LogIn
                </button>
                </span>
                <div className="register">Don't have an account? <span className="span" onClick={registerFunction}>Register</span></div>
            </div>
        </div>
    )
}
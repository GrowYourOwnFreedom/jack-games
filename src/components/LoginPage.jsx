import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useState } from "react"
import { fetchUserByUsername } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const {user, setUser} = useContext(UserContext)
    const [usernameInput, setUsernameInput ] = useState('')
    const [passwordInput, setPasswordInput ] = useState('')
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsernameInput(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPasswordInput(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()

    if( usernameInput.length > 0 && passwordInput.length >= 8 ){
        fetchUserByUsername(usernameInput, passwordInput).then(user => {
            setUser(user)
            navigate(-1)
        })
    }

    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="username-input">username:</label>
            <input id="username-input" type="username" onChange={handleUsernameChange} value={usernameInput} />
            <label htmlFor="password-input">password:</label>
            <input id="password-input" type="password" onChange={handlePasswordChange} value={passwordInput} />
            <button>submit</button>
        </form>

    )
   
}
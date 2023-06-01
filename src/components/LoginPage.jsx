import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useState } from "react"
import { fetchUserByUsername } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const {user, setUser} = useContext(UserContext)
    const [usernameInput, setUsernameInput ] = useState('')
    const navigate = useNavigate();

    const handleChange = (event) => {
        setUsernameInput(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()

    if(usernameInput.length>0){
        fetchUserByUsername(usernameInput).then(user => {
            setUser(user)
            navigate(-1)
        })
    }

    }
    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="username-input">username:</label>
            <input id="username-input" type="text" onChange={handleChange} value={usernameInput} />
            <button>submit</button>
        </form>

    )
   
}
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import "../css/Header.css"

export default function Header() {
    const {user} = useContext(UserContext)
    return <h1>Welcome to Jack's Games Reviews! <span className="username">@{user.username}</span></h1>
}
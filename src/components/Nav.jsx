import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";
import "../css/Nav.css"

export default function Nav() {
	const {user,setUser} = useContext(UserContext)

	const handleClick = () => {
		setUser(false)
	}
	return (
		<nav className="navBar">
			<Link className="link" to="/"> Home </Link>
			{user && <button onClick={handleClick}>sign out</button> }
			<Link className="link" to="/categories"> Review Categories </Link>
		</nav>
	);
}

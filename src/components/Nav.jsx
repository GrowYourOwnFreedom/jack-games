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
			<Link className="link" to="/"><div className="link-backgound">Home</div>  </Link>
			{user && <button onClick={handleClick}>sign out</button> }
			<Link className="link" to="/categories"> Game Categories </Link>
			{user ? (
				<img className="avatar" src={user.avatar_url} alt="" />
			) : (
				<Link className="link" to="/login">
					Login{" "}
				</Link>
			)}
		</nav>
	);
}

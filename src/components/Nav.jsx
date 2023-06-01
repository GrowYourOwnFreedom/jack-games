import { Link } from "react-router-dom";
import "../css/Nav.css"

export default function Nav() {
	return (
		<nav className="navBar">
			<Link className="link" to="/"> Home </Link>
			<span>nav link</span>
			<span>nav link</span>
		</nav>
	);
}

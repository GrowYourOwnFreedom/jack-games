import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import "../css/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
	const { user } = useContext(UserContext);

	return (
		<header className="header">
			<div className="header-title">
				<h1>Welcome to Jack's Games Reviews! </h1>
				{user && <span className="username">@{user.username}</span>}
			</div>
			{user ? (
				<img className="avatar" src={user.avatar_url} alt="" />
			) : (
				<Link className="link" to="/login">
					Login{" "}
				</Link>
			)}
		</header>
	);
}

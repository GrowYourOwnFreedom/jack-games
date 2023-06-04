import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import "../css/Header.css";
export default function Header() {
	const { user } = useContext(UserContext);

	return (
		<header className="header">
			<div>
				<h1 className="page-title">Welcome to Jack's Game Reviews! </h1>
				<h2 className="blurb">Great games, okay reviews and acceptable comments</h2>
			</div>
			{user && <span className="username">@{user.username}</span>}
		</header>
	);
}

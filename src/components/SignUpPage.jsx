import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useState } from "react";
import { postUser } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
	const [nameInput, setNameInput] = useState("");
	const [avatarUrlInput, setAvatarUrlInput] = useState("");
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [repeatPasswordInput, setRepeatPasswordInput] = useState("");
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleNameChange = (event) => {
		setNameInput(event.target.value);
	};
	const handleAvatarUrlChange = (event) => {
		setAvatarUrlInput(event.target.value);
	};
	const handleUsernameChange = (event) => {
		setUsernameInput(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPasswordInput(event.target.value);
	};
	const handleRepeatPasswordChange = (event) => {
		setRepeatPasswordInput(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		if (
			nameInput.length > 0 &&
			usernameInput.length > 0 &&
			passwordInput.length >= 8 &&
			repeatPasswordInput === passwordInput
		) {
			const newUser = {
				name: nameInput,
				avatar_url: avatarUrlInput,
				username: usernameInput,
				password: passwordInput,
			};
			postUser(newUser).then((user) => {
				setUser(user);
				navigate(-1);
			});
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<label htmlFor="name-input">name:</label>
			<input
				id="name-input"
				type="text"
				onChange={handleNameChange}
				value={nameInput}
			/>
			<label htmlFor="avatar-url-input">avatar url:</label>
			<input
				id="avatar-url-input"
				type="text"
				onChange={handleAvatarUrlChange}
				value={avatarUrlInput}
			/>
			<label htmlFor="username-input">username:</label>
			<input
				id="username-input"
				type="username"
				autoComplete="new-username"
				onChange={handleUsernameChange}
				value={usernameInput}
			/>
			<label htmlFor="password-input">password:</label>
			<input
				id="password-input"
				type="password"
				autoComplete="new-password"
				onChange={handlePasswordChange}
				value={passwordInput}
			/>
			<label htmlFor="repeat-password-input">
				please repeat password:
			</label>
			<input
				id="repeat-password-input"
				type="password"
				autoComplete="new-password"
				onChange={handleRepeatPasswordChange}
				value={repeatPasswordInput}
			/>
			<button>Sign Up!</button>
		</form>
	);
}

import { useState } from "react";
import { UserContext } from "./contexts/userContext";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import ReviewsList from "./components/ReviewsList";
import ReviewPage from "./components/ReviewPage";


function App() {
	const [user, setUser] = useState({
		"username": "cooljmessy",
		"name": "Peter Messy",
		"avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002"
		});
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<section className="app">
				<Header/>
				<Nav/>
				<Routes>
					<Route path="/" element ={<ReviewsList/>}/>
					<Route path="/:review_id" element ={<ReviewPage/>}/>

				</Routes>
			</section>

		</UserContext.Provider>
	);
}

export default App;

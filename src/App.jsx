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
		username: "mallionaire",
		name: "haz",
		avatar_url:
			"https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
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

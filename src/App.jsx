import { useState } from "react";
import { UserContext } from "./contexts/userContext";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import ReviewsList from "./components/ReviewsList";
import ReviewPage from "./components/ReviewPage";
import LoginPage from "./components/LoginPage";


function App() {
	const [user, setUser] = useState(false);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<section className="app">
				<Header/>
				<Nav/>
				<Routes>
					<Route path="/" element ={<ReviewsList/>}/>
					<Route path="/:review_id" element ={<ReviewPage/>}/>
					<Route path="/login" element ={<LoginPage/>}/>

				</Routes>
			</section>

		</UserContext.Provider>
	);
}

export default App;

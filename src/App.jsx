import { useState } from "react";
import { UserContext } from "./contexts/userContext";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import ReviewsList from "./components/ReviewsList";
import ReviewPage from "./components/ReviewPage";
import LoginPage from "./components/LoginPage";
import CategoriesPage from "./components/CategoriesPage";
import SignUpPage from "./components/SignUpPage";


function App() {
	const [user, setUser] = useState(false);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			<section className="app">
				<Nav/>
				<Header/>
				<Routes>
					<Route path="/" element ={<ReviewsList/>}/>
					<Route path="/:review_id" element ={<ReviewPage/>}/>
					<Route path="/login" element ={<LoginPage/>}/>
					<Route path="/categories" element ={<CategoriesPage/>}/>
					<Route path="/signup" element ={<SignUpPage/>}/>

				</Routes>
			</section>

		</UserContext.Provider>
	);
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoccerDash from "./soccer/soccerDash";
import NavBar from "./components/navBar";

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<div className="root  ">
					<Routes>
						<Route path="/" element={<h1>Home</h1>} />
						<Route path="/soccer" element={<SoccerDash />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
}

export default App;

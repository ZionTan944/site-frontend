import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoccerDash from "./soccer/soccerDash";
import NavBar from "./components/navBar";

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<h1>ds</h1>} />
					<Route path="/soccer" element={<SoccerDash />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

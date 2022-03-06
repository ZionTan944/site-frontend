import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SoccerDash from "./soccer/soccerDash";
import NavBar from "./components/navBar";

function App() {
	var [active, setActive] = useState(null);
	return (
		<div className="App">
			<Router>
				<NavBar active={active} setActive={setActive} />
				<Routes>
					<Route path="/" element={<h1>ds</h1>} />
					<Route path="/soccer" element={<SoccerDash />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

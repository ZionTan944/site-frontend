import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/common/navBar";

import SoccerDash from "./components/soccer/soccerDash";
import DashBoard from "./components/homePage/dashBoard";

function App() {
	var [active, setActive] = useState(null);

	return (
		<div className="App">
			<Router>
				<NavBar active={active} setActive={setActive} />

				<Routes>
					<Route path="/" element={<DashBoard />} />
					<Route path="/soccer" element={<SoccerDash />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

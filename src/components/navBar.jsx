import { Link } from "react-router-dom";
import Dropdown from "./dropDown";

function NavBar() {
	return (
		<ul className="nav main-color">
			<li className="nav-item">
				<Link to="/">
					<img className="logo" src={"images/Logo.png"} alt="Logo" />
				</Link>
			</li>
			<li className="nav-item main-color-hover" key="Home">
				<Link to="/" className="nav-link">
					Home
				</Link>
			</li>
			<Dropdown name="Projects" />
		</ul>
	);
}

export default NavBar;

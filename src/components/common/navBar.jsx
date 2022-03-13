import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Dropdown from "./dropDown";

function NavBar({ active, setActive }) {
	const path = useLocation().pathname;
	function returnIsActive(value) {
		if (value === active) {
			return "active";
		}
		return "main-color-hover";
	}
	useEffect(() => {
		setActive(path);
	}, [path, setActive]);

	return (
		<ul className="nav main-color">
			<li className="nav-item" onClick={() => setActive("/")}>
				<Link to="/">
					<img
						className="logo"
						src={"images/Logo.png"}
						alt="Logo"
						height="50"
						width="50"
					/>
				</Link>
			</li>
			<li className="nav-item" key="Home" onClick={() => setActive(1)}>
				<Link to="/" className={"nav-link " + returnIsActive("/")}>
					Home
				</Link>
			</li>
			<Dropdown
				name="Projects"
				setActive={setActive}
				isActive={returnIsActive}
			/>
		</ul>
	);
}

export default NavBar;

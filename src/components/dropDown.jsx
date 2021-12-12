import { Link } from "react-router-dom";

function Dropdown({ name }) {
	return (
		<div className="dropdown">
			<button className="dropbtn main-color-hover">{name}</button>
			<div className="dropdown-content main-color-hover">
				<Link to="/soccer" className="nav-link main-color-hover">
					Soccer
				</Link>
			</div>
		</div>
	);
}
export default Dropdown;

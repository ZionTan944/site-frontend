import { Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";

function Dropdown({ name }) {
	return (
		<div className="dropdown">
			<button className="dropbtn main-color-hover">
				{name}
				<HiChevronDown />
			</button>
			<div className="dropdown-content main-color-hover">
				<Link to="/soccer" className="nav-link">
					Soccer
				</Link>
			</div>
		</div>
	);
}
export default Dropdown;

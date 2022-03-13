import { Link } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi";

function Dropdown({ name, setActive, isActive }) {
	return (
		<div className="dropdown nav-item">
			<button className={"dropbtn " + isActive("/soccer")}>
				{name}
				<HiChevronDown />
			</button>
			<div className="dropdown-content main-color-hover">
				<Link
					to="/soccer"
					className="nav-link main-color-hover border"
					onClick={() => setActive(2)}
				>
					Soccer
				</Link>
			</div>
		</div>
	);
}
export default Dropdown;

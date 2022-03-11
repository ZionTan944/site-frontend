import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

function DescriptionBoard({ isBoardShown, setIsBoardShown, children }) {
	function renderIcon() {
		if (isBoardShown) {
			return <IoMdArrowDropupCircle />;
		}
		return <IoMdArrowDropdownCircle />;
	}

	function renderDescription() {
		if (isBoardShown) {
			return <div className="active-hover">{children}</div>;
		}
		return <></>;
	}
	return (
		<>
			{renderDescription()}
			<div
				className="pull-tab text-centre active"
				onClick={() => setIsBoardShown(!isBoardShown)}
			>
				{renderIcon()} Description
			</div>
		</>
	);
}
export default DescriptionBoard;

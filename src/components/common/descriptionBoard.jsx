import { useState } from "react";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { CSSTransition } from "react-transition-group";

function DescriptionBoard({ isBoardShown, setIsBoardShown, children }) {
	const [renderButton, setRenderButton] = useState(true);

	function setIsBoardShownTimeout(boardShown) {
		setIsBoardShown(boardShown);

		setTimeout(function () {
			setRenderButton(true);
		}, 300);
	}

	return (
		<div className="description">
			<CSSTransition
				in={isBoardShown}
				timeout={300}
				classNames="animate"
				mountOnEnter
				unmountOnExit
			>
				<div>
					<div className="active-hover">{children}</div>
					<div
						className="pull-tab text-centre active"
						onClick={() => setIsBoardShownTimeout(!isBoardShown)}
					>
						<IoMdArrowDropupCircle /> Close
					</div>
				</div>
			</CSSTransition>
			{renderButton ? (
				<div
					className="pull-tab text-centre active"
					onClick={() => {
						setIsBoardShown(!isBoardShown);
						setRenderButton(false);
					}}
				>
					<IoMdArrowDropdownCircle /> Open
				</div>
			) : null}
		</div>
	);
}
export default DescriptionBoard;

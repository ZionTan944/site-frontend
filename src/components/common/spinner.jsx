import ClipLoader from "react-spinners/ClipLoader";
import RotateLoader from "react-spinners/RotateLoader";

function Spinner({ type, isLoading, text = "" }) {
	function selectSpinner(type) {
		if (type === "clip") {
			return <ClipLoader />;
		} else if (type === "rotate") {
			return <RotateLoader />;
		}
	}
	if (isLoading) {
		return (
			<div className="float-centre display-flex-col full-height">
				{selectSpinner(type)}
				<p className="margin-none">{text}</p>
			</div>
		);
	}
	return <></>;
}

export default Spinner;

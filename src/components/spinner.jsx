import ClipLoader from "react-spinners/ClipLoader";
import RotateLoader from "react-spinners/RotateLoader";

function Spinner({ type, isLoading }) {
	function selectSpinner(type) {
		if (type === "clip") {
			return <ClipLoader />;
		} else if (type === "rotate") {
			return <RotateLoader />;
		}
	}
	if (isLoading) {
		return <div className="float-centre">{selectSpinner(type)}</div>;
	}
	return <></>;
}

export default Spinner;

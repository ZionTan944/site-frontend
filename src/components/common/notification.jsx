import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GiCancel } from "react-icons/gi";
import commonActionTypes from "../../actions/commonActions";

function Notification() {
	const dispatch = useDispatch();

	const showAlert = useSelector((state) => state.alert.showAlert);
	const alertType = useSelector((state) => state.alert.alertType);
	const alertMessage = useSelector((state) => state.alert.alertMessage);

	function closeNotification() {
		dispatch({
			type: commonActionTypes.RESET_ALERT,
		});
	}
	useEffect(() => {
		if (showAlert === true) {
			setTimeout(function () {
				dispatch({
					type: commonActionTypes.RESET_ALERT,
				});
			}, 10000);
		}
	}, [dispatch, showAlert]);

	function returnAlertColor() {
		if (alertType === "fail") {
			return "error-red";
		} else if (alertType === "success") {
			return "success-green";
		} else {
			return "warning-yellow";
		}
	}

	return (
		<>
			{showAlert ? (
				<div className="alert-screen">
					<div className="alert-container float-right border-rounded display-flex-row">
						<div
							className={"alert-colored flex-basis-five " + returnAlertColor()}
						></div>
						<div className="flex-basis-eighty alert-message">
							Error: {alertMessage}
						</div>
						<div className="flex-basis-five">
							<GiCancel onClick={() => closeNotification()} />
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
export default Notification;

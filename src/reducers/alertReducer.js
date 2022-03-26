import commonActionTypes from "../actions/commonActions";

const initState = {
	alertType: "fail",
	alertMessage: "standard error message",
	showAlert: false,
};
const alertReducer = (state = initState, action) => {
	if (action.type === commonActionTypes.SET_ALERT) {
		return {
			...state,
			alertType: action.data.alertType,
			alertMessage: action.data.alertMessage,
			showAlert: true,
		};
	} else {
		return {
			...initState,
			showAlert: false,
		};
	}
};
export default alertReducer;

import soccerActionTypes from "../actions/soccerActions";

const initState = {
	loading: false,
};
const loadingReducer = (state = initState, action) => {
	if (
		[
			soccerActionTypes.SET_TEAM_DATA,
			soccerActionTypes.SET_SELECTED_TEAM,
			soccerActionTypes.SET_LEAGUE_DISPLAY,
			soccerActionTypes.SET_LEAGUE_DISPLAY_INIT,
		].includes(action.type)
	) {
		return { loading: false };
	} else if (
		[
			soccerActionTypes.RUN_SOCCER_LEAGUE,
			soccerActionTypes.RESTART_SOCCER_LEAGUE,
			soccerActionTypes.GET_TEAM_DATA,
		].includes(action.type)
	) {
		return { loading: true };
	} else {
		return { ...state };
	}
};

export default loadingReducer;

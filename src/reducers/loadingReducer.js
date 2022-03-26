import soccerActionTypes from "../actions/soccerActions";

const initState = {
	soccerLoading: false,
	soccerTeamLoading: false,
};
const loadingReducer = (state = initState, action) => {
	if (
		[
			soccerActionTypes.SET_SELECTED_TEAM,
			soccerActionTypes.SET_LEAGUE_DISPLAY,
			soccerActionTypes.SET_LEAGUE_DISPLAY_INIT,
		].includes(action.type)
	) {
		return { ...state, soccerLoading: false };
	} else if (action.type === soccerActionTypes.SET_TEAM_DATA) {
		return { ...state, soccerTeamLoading: false };
	} else if (
		[
			soccerActionTypes.RUN_SOCCER_LEAGUE,
			soccerActionTypes.RESTART_SOCCER_LEAGUE,
		].includes(action.type)
	) {
		return { ...state, soccerLoading: true };
	} else if (action.type === soccerActionTypes.GET_TEAM_DATA) {
		return { ...state, soccerTeamLoading: true };
	} else {
		return { ...state };
	}
};

export default loadingReducer;

import soccerActionTypes from "../actions/soccerActions";

const initState = {
	selectedTeam: "",
	selectedTeamData: {},
	selectedTeamSchedule: [{}],
};

const soccerTeamReducer = (state = initState, action) => {
	if (action.type === soccerActionTypes.SET_TEAM_DATA) {
		return {
			...state,
			selectedTeamData: action.result.team_data,
			selectedTeamSchedule: action.result.schedule,
		};
	} else if (action.type === soccerActionTypes.SET_SELECTED_TEAM) {
		return {
			...state,
			selectedTeam: action.data,
		};
	} else {
		return { ...state };
	}
};

export default soccerTeamReducer;

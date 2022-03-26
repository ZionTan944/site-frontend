import soccerActionTypes from "../actions/soccerActions";

const initState = {
	currentUpdate: 0,
	selectedTeam: ["", ""],
	selectedTeamData: [{}, {}],
	selectedTeamSchedule: [[{}], [{}]],
};

const soccerTeamReducer = (state = initState, action) => {
	if (action.type === soccerActionTypes.SET_TEAM_DATA) {
		return {
			...state,
			selectedTeamData: [
				action.result.response[0].team_data,
				action.result.response[1].team_data,
			],
			selectedTeamSchedule: [
				action.result.response[0].schedule,
				action.result.response[1].schedule,
			],
		};
	} else if (action.type === soccerActionTypes.SET_SELECTED_TEAM) {
		if (state.selectedTeam[0] === "") {
			return {
				...state,
				selectedTeam: [action.data, state.selectedTeam[1]],
				currentUpdate: 0,
			};
		} else if (state.selectedTeam[1] === "") {
			return {
				...state,
				selectedTeam: [state.selectedTeam[0], action.data],
				currentUpdate: 1,
			};
		} else {
			return { ...state };
		}
	} else if (action.type === soccerActionTypes.UNSET_SELECTED_TEAM) {
		var index = action.data.index;
		if (index === 0) {
			return {
				...state,
				selectedTeam: ["", state.selectedTeam[1]],
				selectedTeamData: [{}, state.selectedTeamData[1]],
				selectedTeamSchedule: [[{}], state.selectedTeamSchedule[1]],
			};
		} else {
			return {
				...state,
				selectedTeam: [state.selectedTeam[0], ""],
				selectedTeamData: [state.selectedTeamData[0], {}],
				selectedTeamSchedule: [state.selectedTeamSchedule[0], [{}]],
			};
		}
	} else {
		return { ...state };
	}
};

export default soccerTeamReducer;

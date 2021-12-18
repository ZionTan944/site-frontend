import soccerActionTypes from "../actions/soccerActions";

const initState = {
	leagueData: [],
	matchWeek: 0,
	leagueName: "",
	matchResults: [],
};

const soccerLeagueReducer = (state = initState, action) => {
	if (action.type === soccerActionTypes.SET_LEAGUE_DISPLAY_INIT) {
		return {
			...state,
			leagueData: action.result.tabledata,
			matchWeek: action.result.matchweek,
		};
	} else if (action.type === soccerActionTypes.SET_LEAGUE_DISPLAY) {
		return {
			...state,
			leagueData: action.result.tabledata,
			matchWeek: action.result.matchweek,
			matchResults: action.result.matchresults,
		};
	} else if (action.type === soccerActionTypes.SET_LEAGUE_NAME) {
		return {
			...state,
			leagueName: action.result.leaguename,
		};
	} else {
		return { ...state };
	}
};

export default soccerLeagueReducer;

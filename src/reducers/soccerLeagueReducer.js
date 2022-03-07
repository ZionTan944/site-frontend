import soccerActionTypes from "../actions/soccerActions";

const initState = {
	leagueData: [],
	matchWeek: 0,
	leagueName: "",
	matchResults: [],
	seasonLength: 0,
	leagueMeta: {},
};

const soccerLeagueReducer = (state = initState, action) => {
	if (action.type === soccerActionTypes.SET_LEAGUE_DISPLAY_INIT) {
		return {
			...state,
			leagueData: action.result.league_table,
			matchWeek: action.result.match_week,
			matchResults: [],
			seasonLength: action.result.total_weeks,
			leagueMeta: action.result.meta,
		};
	} else if (action.type === soccerActionTypes.SET_LEAGUE_DISPLAY) {
		return {
			...state,
			leagueData: action.result.league_table,
			matchWeek: action.result.match_week,
			matchResults: action.result.match_results,
		};
	} else {
		return { ...state };
	}
};

export default soccerLeagueReducer;

import { combineReducers } from "redux";
import soccerLeagueReducer from "./soccerLeagueReducer";
import soccerTeamReducer from "./soccerTeamReducer";
import loadingReducer from "./loadingReducer";
import alertReducer from "./alertReducer";

const rootReducer = combineReducers({
	soccerLeague: soccerLeagueReducer,
	soccerTeam: soccerTeamReducer,
	loader: loadingReducer,
	alert: alertReducer,
});

export default rootReducer;

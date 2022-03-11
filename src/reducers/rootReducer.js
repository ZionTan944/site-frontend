import { combineReducers } from "redux";
import soccerLeagueReducer from "./soccerLeagueReducer";
import soccerTeamReducer from "./soccerTeamReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
	soccerLeague: soccerLeagueReducer,
	soccerTeam: soccerTeamReducer,
	loader: loadingReducer,
});

export default rootReducer;

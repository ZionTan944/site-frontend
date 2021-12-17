import { combineReducers } from "redux";
import soccerLeagueReducer from "./soccerLeagueReducer";
import soccerTeamReducer from "./soccerTeamReducer";

const rootReducer = combineReducers({
	soccerLeague: soccerLeagueReducer,
	soccerTeam: soccerTeamReducer,
});

export default rootReducer;

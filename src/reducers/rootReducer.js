import { combineReducers } from "redux";
import soccerLeagueReducer from "./soccerReducer";

const rootReducer = combineReducers({
  soccerReducer: soccerLeagueReducer,
  //   renderReducer: renderReducer,
  //   teamReducer: teamReducer,
});

export default rootReducer;

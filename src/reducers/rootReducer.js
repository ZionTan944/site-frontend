import { combineReducers } from "redux";
import soccerReducer from "./soccerReducer";

const rootReducer = combineReducers({
  soccerReducer: soccerReducer,
  //   renderReducer: renderReducer,
  //   teamReducer: teamReducer,
});

export default rootReducer;

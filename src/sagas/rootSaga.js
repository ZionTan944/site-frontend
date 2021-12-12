import { soccerSaga } from "./soccerSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([soccerSaga()]);
}

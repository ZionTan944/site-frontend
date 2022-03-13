/* eslint-disable require-yield */
import soccerActionTypes from "../actions/soccerActions";
import { takeEvery, put } from "redux-saga/effects";

const apiUrl = " http://192.168.1.69:8080/";

export function* runSoccerLeague() {
	const data = yield fetch(apiUrl + "soccer_league/run", {
		method: "POST",
	}).then((response) => response.json());
	yield put({
		type: soccerActionTypes.SET_LEAGUE_DISPLAY,
		result: data,
	});
}

export function* restartSoccerLeague(request) {
	const data = yield fetch(apiUrl + "soccer_league/reset", {
		method: "POST",
		body: JSON.stringify({ league_id: request.data }),
	}).then((response) => response.json());
	yield put({ type: soccerActionTypes.SET_LEAGUE_DISPLAY_INIT, result: data });
}

export function* getTeamData(request) {
	const data = yield fetch(apiUrl + "soccer_league/get_team", {
		method: "POST",
		body: JSON.stringify({ team_name: request.data }),
	}).then((response) => response.json());
	console.log("a", data.schedule[0]);
	yield put({ type: soccerActionTypes.SET_TEAM_DATA, result: data });
}

export function* soccerSaga() {
	yield takeEvery(soccerActionTypes.RUN_SOCCER_LEAGUE, runSoccerLeague);
	yield takeEvery(soccerActionTypes.RESTART_SOCCER_LEAGUE, restartSoccerLeague);
	yield takeEvery(soccerActionTypes.GET_TEAM_DATA, getTeamData);
}

/* eslint-disable require-yield */
import soccerActionTypes from "../actions/soccerActions";
import { takeEvery, put } from "redux-saga/effects";

export function* runSoccerLeague() {
	const data = yield fetch("http://127.0.0.1:8000/soccer_league/run_league/", {
		method: "POST",
	}).then((response) => response.json());
	yield put({
		type: soccerActionTypes.SET_LEAGUE_DISPLAY,
		result: data,
	});
}

export function* restartSoccerLeague() {
	const data = yield fetch(
		"http://127.0.0.1:8000/soccer_league/start_league/",
		{
			method: "POST",
		}
	).then((response) => response.json());
	yield put({ type: soccerActionTypes.SET_LEAGUE_DISPLAY_INIT, result: data });
}

export function* getLeagueName() {
	const data = yield fetch(
		"http://127.0.0.1:8000/soccer_league/get_league_name/",
		{
			method: "POST",
		}
	).then((response) => response.json());
	yield put({ type: soccerActionTypes.SET_LEAGUE_NAME, result: data });
}

export function* getTeamData(request) {
	const data = yield fetch(
		"http://127.0.0.1:8000/soccer_league/get_team_data/",
		{
			method: "POST",
			body: JSON.stringify({ teamName: request.data }),
		}
	).then((response) => response.json());
	yield put({ type: soccerActionTypes.SET_TEAM_DATA, result: data });
}

export function* soccerSaga() {
	yield takeEvery(soccerActionTypes.RUN_SOCCER_LEAGUE, runSoccerLeague);
	yield takeEvery(soccerActionTypes.RESTART_SOCCER_LEAGUE, restartSoccerLeague);
	yield takeEvery(soccerActionTypes.GET_LEAGUE_NAME, getLeagueName);
	yield takeEvery(soccerActionTypes.GET_TEAM_DATA, getTeamData);
}

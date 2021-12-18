import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";
import { GiSoccerBall } from "react-icons/gi";

import TableDisplay from "./tableDisplay";
import TeamDisplay from "./teamDisplay";
import MatchDisplay from "./matchDisplay";

function SoccerDash() {
	var dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: soccerActionTypes.GET_LEAGUE_NAME,
		});
	}, [dispatch]);

	const leagueName = useSelector((state) => state.soccerLeague.leagueName);

	return (
		<div className="soccer-display">
			<h1>
				<GiSoccerBall /> Soccer Simulator: {leagueName}
			</h1>
			<div className="parent-div">
				<div className="left-child">
					<TableDisplay />
				</div>
				<div className="right-child">
					<TeamDisplay />
					<MatchDisplay />
				</div>
			</div>
		</div>
	);
}

export default SoccerDash;

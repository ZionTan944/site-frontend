import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";
import { GiSoccerBall } from "react-icons/gi";

import TableDisplay from "./tableDisplay";
import TeamDisplay from "./teamDisplay";

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
					<div className="upper-child">
						<TeamDisplay />
					</div>
					<div className="lower-child">
						<p>MatchDisplay</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SoccerDash;

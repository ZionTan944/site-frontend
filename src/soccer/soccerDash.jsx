import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";
import { GiSoccerBall } from "react-icons/gi";

import TableDisplay from "./tableDisplay";
import TeamDisplay from "./teamDisplay";
import MatchDisplay from "./matchDisplay";

function SoccerDash() {
	var dispatch = useDispatch();
	var [isTeamCardVisible, setIsTeamCardVisible] = useState(false);

	useEffect(() => {
		dispatch({
			type: soccerActionTypes.GET_LEAGUE_NAME,
		});
	}, [dispatch]);

	const leagueName = useSelector((state) => state.soccerLeague.leagueName);

	function renderTeamDisplay(isTeamCardVisible) {
		if (isTeamCardVisible) {
			return <TeamDisplay setIsTeamCardVisible={setIsTeamCardVisible} />;
		}
		return null;
	}

	return (
		<div className="soccer-display">
			<h1>
				<GiSoccerBall /> Soccer Simulator: {leagueName}
			</h1>
			<div className="parent-div">
				<div className="left-child">
					<TableDisplay setIsTeamCardVisible={setIsTeamCardVisible} />
				</div>
				<div className="right-child">
					<MatchDisplay setIsTeamCardVisible={setIsTeamCardVisible} />
					{renderTeamDisplay(isTeamCardVisible)}
				</div>
			</div>
		</div>
	);
}

export default SoccerDash;

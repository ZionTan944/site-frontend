import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";
import { GiSoccerBall } from "react-icons/gi";

import TableDisplay from "./tableDisplay";
import TeamDisplay from "./teamDisplay";
import MatchDisplay from "./matchDisplay";

function SoccerDash() {
	var dispatch = useDispatch();
	var [isTeamCardVisible, setIsTeamCardVisible] = useState(false);
	var [selectedLeague, setSelectedLeague] = useState(1);

	useEffect(() => {
		dispatch({
			type: soccerActionTypes.RESTART_SOCCER_LEAGUE,
			data: selectedLeague,
		});
		setIsTeamCardVisible(false);
	}, [dispatch, selectedLeague]);

	function renderTeamDisplay(isTeamCardVisible) {
		if (isTeamCardVisible) {
			return <TeamDisplay setIsTeamCardVisible={setIsTeamCardVisible} />;
		}
		return null;
	}

	return (
		<div>
			<div className="soccer-display">
				<label htmlFor="league" className="header-1 soccer-header">
					<GiSoccerBall /> Soccer League Simulator:
				</label>
				<select
					className="soccer-select header-1 sec-color-hover"
					name="league"
					id="league"
					onChange={(event) => setSelectedLeague(event.target.value)}
				>
					<option value="1">English Premier League</option>
					<option value="2">English Football League</option>
				</select>
				<div className="parent-div">
					<div className="left-child">
						<TableDisplay
							setIsTeamCardVisible={setIsTeamCardVisible}
							selectedLeague={selectedLeague}
						/>
					</div>
					<div className="right-child">
						<MatchDisplay setIsTeamCardVisible={setIsTeamCardVisible} />
						{renderTeamDisplay(isTeamCardVisible)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SoccerDash;

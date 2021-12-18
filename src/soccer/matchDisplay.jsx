import { useSelector, useDispatch } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";

function MatchDisplay() {
	const dispatch = useDispatch();

	const matchResults = useSelector((state) => state.soccerLeague.matchResults);
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);

	const matchHeaders = ["Home", "-", "VS", "-", "Away"];

	function setSelectedTeam(team) {
		console.log("a");
		dispatch({
			type: soccerActionTypes.SET_SELECTED_TEAM,
			data: team,
		});
	}

	function returnMatchResult(goalsFor, goalsAway) {
		if (goalsFor > goalsAway) {
			return "success-green-hover";
		} else if (goalsFor < goalsAway) {
			return "error-red-hover";
		} else {
			return "null-gray-hover";
		}
	}

	function renderMatchTableForRow(matchData) {
		return (
			<>
				<td
					className={
						"text-left team-name-table-data " +
						returnMatchResult(matchData.home_goals, matchData.away_goals)
					}
					onClick={() => setSelectedTeam(matchData.home_team)}
				>
					<img
						className="team-logo-card"
						src={"soccer_images/" + matchData.home_team + ".png"}
						alt=""
						height="15"
						width="15"
					/>
					{matchData.home_team_name}
				</td>
				<td className="text-centre">{matchData.home_goals}</td>
				<td className="text-centre">-</td>
				<td className="text-centre">{matchData.away_goals}</td>
				<td
					className={
						"text-right team-name-table-data " +
						returnMatchResult(matchData.away_goals, matchData.home_goals)
					}
					onClick={() => setSelectedTeam(matchData.away_team)}
				>
					{matchData.away_team_name}
					<img
						className="team-logo-card"
						src={"soccer_images/" + matchData.home_team + ".png"}
						alt=""
						height="15"
						width="15"
					/>
				</td>
			</>
		);
	}

	function renderMatchTableData(matchData) {
		return (
			<tr key={matchData.home_team} className="border">
				{renderMatchTableForRow(matchData)}
			</tr>
		);
	}

	if (Object.keys(matchResults).length === 0) {
		return null;
	}

	return (
		<div className="team-display-card">
			<p className="match-card-header">Match Results: Week {matchWeek}</p>
			<table className="match-result-table null-gray">
				<thead>
					<tr className="border">
						{matchHeaders.map((header, index) => (
							<th key={"r" + index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{matchResults.map((matchData) => renderMatchTableData(matchData))}
				</tbody>
			</table>
		</div>
	);
}

export default MatchDisplay;

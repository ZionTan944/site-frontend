import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function MatchDisplay({ setIsTeamCardVisible }) {
	const dispatch = useDispatch();

	const matchResults = useSelector((state) => state.soccerLeague.matchResults);
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);

	const [selectedWeek, setSelectedWeek] = useState(Math.max(matchWeek, 0));

	useEffect(() => {
		setSelectedWeek(Math.max(matchWeek - 1, 0));
	}, [setSelectedWeek, matchWeek]);

	const matchHeaders = ["Home", "-", "VS", "-", "Away"];

	function setSelectedTeam(team) {
		dispatch({
			type: soccerActionTypes.SET_SELECTED_TEAM,
			data: team,
		});
		setIsTeamCardVisible(true);
	}

	function returnMatchResult(goalsFor, goalsAway) {
		if (goalsFor > goalsAway) {
			return "success-light-green-hover";
		} else if (goalsFor < goalsAway) {
			return "error-light-red-hover";
		} else {
			return "null-light-gray-hover";
		}
	}

	function renderMatchPlayed(matchData) {
		if (selectedWeek >= matchWeek) {
			return (
				<td className="text-centre" colSpan="3">
					{" "}
					Not Played
				</td>
			);
		}
		return (
			<>
				<td className="text-centre">{matchData.home_goals}</td>
				<td className="text-centre">-</td>
				<td className="text-centre">{matchData.away_goals}</td>
			</>
		);
	}

	function renderMatchTableForRow(matchData) {
		return (
			<>
				<td
					className={
						"text-left team-name-table-data " +
						returnMatchResult(matchData.home_goals, matchData.away_goals)
					}
					onClick={() => setSelectedTeam(matchData.home_team_name)}
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
				{renderMatchPlayed(matchData)}
				<td
					className={
						"text-right team-name-table-data " +
						returnMatchResult(matchData.away_goals, matchData.home_goals)
					}
					onClick={() => setSelectedTeam(matchData.away_team_name)}
				>
					{matchData.away_team_name}
					<img
						className="team-logo-card"
						src={"soccer_images/" + matchData.away_team + ".png"}
						alt=""
						height="15"
						width="15"
					/>
				</td>
			</>
		);
	}

	function renderMatchTableData(matchData) {
		if (matchData.away_team === "RES" || matchData.home_team === "RES") {
			return null;
		}
		return (
			<tr key={"Match" + matchData.home_team} className="border">
				{renderMatchTableForRow(matchData)}
			</tr>
		);
	}
	return (
		<div className="team-display-card card-light match-display-card border">
			<div className="display-even-split">
				<BiLeftArrow
					className="match-card-header"
					onClick={() => setSelectedWeek(Math.max(selectedWeek - 1, 0))}
				/>
				<p className="match-card-header">
					Match Schedule: Week {selectedWeek + 1}
				</p>
				<BiRightArrow
					className="match-card-header"
					onClick={() =>
						setSelectedWeek(Math.min(selectedWeek + 1, matchResults.length - 1))
					}
				/>
			</div>
			<table className="match-result-table null-gray">
				<thead>
					<tr className="border">
						{matchHeaders.map((header, index) => (
							<th key={"r" + index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{matchResults[Math.max(selectedWeek, 0)].map((matchData) =>
						renderMatchTableData(matchData)
					)}
				</tbody>
			</table>
		</div>
	);
}

export default MatchDisplay;

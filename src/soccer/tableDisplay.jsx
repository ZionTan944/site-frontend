import { addItemInArray } from "../utils/utilFunctions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import soccerActionTypes from "../actions/soccerActions";

function TableDisplay() {
	var dispatch = useDispatch();

	const tableData = useSelector((state) => state.soccerLeague.leagueData);
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);

	useEffect(() => {
		dispatch({
			type: soccerActionTypes.RESTART_SOCCER_LEAGUE,
		});
	}, [dispatch]);

	var tableHeaders = [
		"#",
		"",
		"Team",
		"GP",
		"Wins",
		"Draws",
		"Losses",
		"GF",
		"GA",
		"GD",
		"Points",
		"",
	];
	function setSelectedTeam(team) {
		dispatch({
			type: soccerActionTypes.SET_SELECTED_TEAM,
			data: team,
		});
	}
	function renderLeagueDataForRow(teamData) {
		var newTeamData = addItemInArray(teamData, 1, "img");
		return newTeamData.map((teamStats, i) => {
			if (i === 1) {
				return (
					<td key={i}>
						<img
							className="team-logo-card"
							src={"soccer_images/" + newTeamData[2] + ".png"}
							alt=""
							height="40"
							width="40"
						/>
					</td>
				);
			} else {
				return <td key={i}>{teamStats}</td>;
			}
		});
	}
	function returnLeagueHoverClass(place) {
		if (["1", "18", "19", "20"].includes(place)) {
			return "rank" + place;
		}
		return "null-gray-hover";
	}

	function renderLeagueTableData(teamData) {
		return (
			<tr
				key={"league-table-row" + tableData.indexOf(teamData)}
				className={
					"league-table-row " + returnLeagueHoverClass(teamData[0].toString())
				}
				onClick={() => setSelectedTeam(teamData[1])}
			>
				{renderLeagueDataForRow(teamData)}
			</tr>
		);
	}
	function proceedButtonClicked() {
		dispatch({
			type: soccerActionTypes.RUN_SOCCER_LEAGUE,
		});
	}
	function restartButtonClicked() {
		dispatch({
			type: soccerActionTypes.RESTART_SOCCER_LEAGUE,
		});
	}

	function renderButton() {
		if (matchWeek < 42) {
			return (
				<button
					className="proceed-button success-green-hover text-white"
					onClick={() => proceedButtonClicked()}
				>
					Continue
				</button>
			);
		}
		return null;
	}

	return (
		<>
			<h2>MatchWeek: {matchWeek}</h2>

			{renderButton()}
			<button
				className="restart-button error-red-hover text-white"
				onClick={() => restartButtonClicked()}
			>
				Restart
			</button>

			<div>
				<table className="league-table large-text">
					<thead key="league-table-header">
						<tr>
							{tableHeaders.map((header, index) => (
								<th key={"league-table-header" + index}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{tableData.map((teamData) => renderLeagueTableData(teamData))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default TableDisplay;

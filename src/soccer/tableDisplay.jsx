import { addItemInArray } from "../utils/utilFunctions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import soccerActionTypes from "../actions/soccerActions";

function TableDisplay() {
	var dispatch = useDispatch();

	const tableData = useSelector((state) => state.soccerReducer.leagueData);
	const matchWeek = useSelector((state) => state.soccerReducer.matchWeek);

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
							height="20"
							width="20"
						/>
					</td>
				);
			} else {
				return <td key={i}>{teamStats}</td>;
			}
		});
	}
	function renderLeagueTableData(teamData) {
		return (
			<tr
				key={"league-table-row" + tableData.indexOf(teamData)}
				className={"league-table-row team rank" + teamData[0].toString()}
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
					className="proceed-button success-green-hover"
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
				className="restart-button error-red-hover"
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

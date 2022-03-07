import { useSelector, useDispatch } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";

function TableDisplay({ setIsTeamCardVisible, selectedLeague }) {
	var dispatch = useDispatch();

	const tableData = useSelector((state) => state.soccerLeague.leagueData);
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);
	const seasonLength = useSelector((state) => state.soccerLeague.seasonLength);
	const leagueMeta = useSelector((state) => state.soccerLeague.leagueMeta);

	var tableHeaders = {
		Placing: "#",
		Team: "Team",
		GP: "Games Played",
		W: "Wins",
		D: "Draws",
		L: "Losses",
		GF: "Goals For",
		GA: "Goals Against",
		GD: "Goal Difference",
		Points: "Points",
		"-": "Team Movement",
	};
	function setSelectedTeam(team) {
		dispatch({
			type: soccerActionTypes.SET_SELECTED_TEAM,
			data: team,
		});
		setIsTeamCardVisible(true);
	}
	function renderLeagueDataForRow(teamData) {
		return teamData.map((teamStats, i) => {
			if (i === 1) {
				return (
					<td key={i}>
						<img
							className="team-logo-card"
							src={"soccer_images/" + teamData[2] + ".png"}
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
		if (leagueMeta.top.includes(parseInt(place))) {
			return "ranktoplevel";
		} else if (leagueMeta.second.includes(parseInt(place))) {
			return "ranksecondlevel";
		} else if (leagueMeta.third.includes(parseInt(place))) {
			return "rankthirdlevel";
		} else if (leagueMeta.relegation.includes(parseInt(place))) {
			return "rankrelegation";
		}
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
			data: selectedLeague,
		});
		setIsTeamCardVisible(false);
	}

	function renderButton() {
		if (matchWeek < seasonLength) {
			return (
				<button
					className="proceed-button success-green-hover text-white"
					onClick={() => proceedButtonClicked()}
				>
					Continue
				</button>
			);
		}
		return <></>;
	}

	return (
		<>
			<h2>Match Week: {matchWeek}</h2>

			{renderButton()}
			<button
				className="restart-button error-red-hover text-white"
				onClick={() => restartButtonClicked()}
			>
				Restart
			</button>

			<div>
				<table className="league-table normal-text">
					<thead key="league-table-header">
						<tr>
							{Object.keys(tableHeaders).map((key, index) => {
								if (key === "Team") {
									return (
										<th
											colSpan={2}
											key={"league-table-header" + index}
											title={tableHeaders[key]}
										>
											{key}
										</th>
									);
								}
								return (
									<th
										key={"league-table-header" + index}
										title={tableHeaders[key]}
									>
										{key}
									</th>
								);
							})}
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

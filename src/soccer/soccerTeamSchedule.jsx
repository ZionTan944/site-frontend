import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import soccerActionTypes from "../actions/soccerActions";

function SoccerTeamSchedule({
	schedule,
	teamName,
	teamInt,
	setIsTeamCardVisible,
}) {
	const dispatch = useDispatch();
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);
	const seasonLength = useSelector((state) => state.soccerLeague.seasonLength);

	const [selectedWeek, setSelectedWeek] = useState(Math.max(matchWeek, 0));

	useEffect(() => {
		setSelectedWeek(Math.max(matchWeek, 0));
	}, [setSelectedWeek, matchWeek]);

	function checkMatchStatus(match) {
		if (match.opponent === "RES") {
			return (
				<>
					<td colSpan="5">No Match This Week</td>
					<td className="border">{match.match_week}</td>
				</>
			);
		}
		return true;
	}
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
	function returnFormatedTeamData(match, teamName, teamInt) {
		if (match.location === "H") {
			return {
				homeTeamName: teamName,
				homeTeam: teamInt,
				homeGoals: match.gf,
				homeResult: returnMatchResult(match.gf, match.ga),
				awayResult: returnMatchResult(match.ga, match.gf),
				awayGoals: match.ga,
				awayTeam: match.opponent,
				awayTeamName: match.opponent_name,
			};
		}
		return {
			homeTeamName: match.opponent_name,
			homeTeam: match.opponent,
			homeGoals: match.ga,
			homeResult: returnMatchResult(match.ga, match.gf),
			awayResult: returnMatchResult(match.gf, match.ga),
			awayGoals: match.gf,
			awayTeam: teamInt,
			awayTeamName: teamName,
		};
	}

	function renderScoreLine(matchData) {
		if (matchData.homeGoals === null || matchData.awayGoals === null) {
			return (
				<td className="null-gray" colSpan="3">
					-
				</td>
			);
		}
		return (
			<>
				<td>{matchData.homeGoals}</td>
				<td>-</td>
				<td>{matchData.awayGoals}</td>
			</>
		);
	}

	function renderTeamScheduleForRow(match) {
		var result = checkMatchStatus(match);
		if (result !== true) {
			return result;
		}
		var matchData = returnFormatedTeamData(match, teamName, teamInt);
		return (
			<>
				<td
					className={"text-left team-name-table-data " + matchData.homeResult}
					onClick={() => {
						setSelectedTeam(matchData.homeTeamName);
					}}
				>
					<img
						className="team-logo-card"
						src={"soccer_images/" + matchData.homeTeam + ".png"}
						alt=""
						height="15"
						width="15"
					/>
					{matchData.homeTeamName}
				</td>
				{renderScoreLine(matchData)}
				<td
					className={"text-right team-name-table-data " + matchData.awayResult}
					onClick={() => {
						setSelectedTeam(matchData.awayTeamName);
					}}
				>
					{matchData.awayTeamName}
					<img
						className="team-logo-card"
						src={"soccer_images/" + matchData.awayTeam + ".png"}
						alt=""
						height="15"
						width="15"
					/>
				</td>
				<td className="border">{match.match_week}</td>
			</>
		);
	}

	function renderTeamSchedule(schedule, matchWeek) {
		let selectedSchedule = schedule.slice(matchWeek, matchWeek + 5);
		if (seasonLength - matchWeek < 5) {
			selectedSchedule = schedule.slice(
				Math.min(matchWeek, seasonLength - 5),
				Math.max(seasonLength, matchWeek)
			);
		}
		return selectedSchedule.map((match, index) => {
			return (
				<tr key={index} className="text-centre team-schedule-row">
					{renderTeamScheduleForRow(match)}
				</tr>
			);
		});
	}

	function renderUpcomingMatch(schedule, matchWeek) {
		let selectedMatchWeek = matchWeek;

		let nextMatch = "";
		if (schedule.length === selectedMatchWeek) {
			nextMatch = "End of Season";
		} else if (schedule[selectedMatchWeek].opponent === "RES") {
			nextMatch = "Next Week: No game scheduled";
		} else {
			nextMatch = "Next Week: " + schedule[selectedMatchWeek].opponent_name;
		}
		return (
			<>
				<td colSpan="5">{nextMatch}</td>
				<td className="border">
					<BiDownArrow
						className="float-right"
						onClick={() =>
							setSelectedWeek(Math.min(selectedWeek + 1, schedule.length))
						}
					/>
				</td>
			</>
		);
	}

	return (
		<>
			<table className="team-display-card-container team-schedule-table">
				<thead key="team-schedule">
					<tr className="null-gray team-schedule-row">
						<th>Home</th>
						<th>-</th>
						<th>VS</th>
						<th>-</th>
						<th>Away</th>
						<th className="border">
							<BiUpArrow
								className="float-right"
								onClick={() => setSelectedWeek(Math.max(selectedWeek - 1, 5))}
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					{renderTeamSchedule(schedule, selectedWeek)}
					<tr key="index" className="text-centre">
						{renderUpcomingMatch(schedule, selectedWeek)}
					</tr>
				</tbody>
			</table>
		</>
	);
}
export default SoccerTeamSchedule;

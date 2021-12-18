import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import soccerActionTypes from "../actions/soccerActions";
import { returnWithPlacingSuffix } from "../utils/utilFunctions";

import SoccerTeamSchedule from "./soccerTeamSchedule";

function TeamDisplay() {
	var dispatch = useDispatch();
	const leagueData = useSelector((state) => state.soccerLeague.leagueData);
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);

	const selectedTeam = useSelector((state) => state.soccerTeam.selectedTeam);
	const teamData = useSelector((state) => state.soccerTeam.selectedTeamData);
	const loading = useSelector((state) => state.soccerTeam.loading);

	const schedule = useSelector(
		(state) => state.soccerTeam.selectedTeamSchedule
	);
	const cardHeaders = {
		gp: "GP",
		place: "Place",
		w: "Wins",
		d: "Draws",
		l: "Losses",
		gf: "GF",
		ga: "GA",
		gd: "GD",
	};
	useEffect(() => {
		if (selectedTeam !== "") {
			dispatch({
				type: soccerActionTypes.GET_TEAM_DATA,
				data: selectedTeam,
			});
		}
	}, [dispatch, selectedTeam, leagueData]);

	function returnMatchResult(result) {
		switch (result) {
			case (result = "W"):
				return "success-green";
			case (result = "L"):
				return "error-red";
			default:
				return "null-gray";
		}
	}

	function renderLastTenMatches(schedule, matchWeek) {
		let selectedSchedule = [];
		for (var index = matchWeek - 1; index >= 0; index--) {
			if (
				selectedSchedule.length < Math.min(matchWeek, 10) &&
				schedule[index].opponent !== "RES"
			) {
				selectedSchedule.unshift(schedule[index]);
			}
			if (selectedSchedule.length === 10) {
				break;
			}
		}
		return (
			<>
				{selectedSchedule.length === 0 ? null : (
					<p className="last-matches-header">
						Last {selectedSchedule.length} :
					</p>
				)}
				{selectedSchedule.map((match) => {
					return (
						<div
							key={match.opponent}
							className={
								"card-data-row circle small-text text-centre " +
								returnMatchResult(match.result)
							}
						>
							{match.result}
						</div>
					);
				})}
			</>
		);
	}

	if (Object.keys(teamData).length === 0 || loading) {
		return null;
	}
	return (
		<>
			<div className="team-display-card">
				<div className="team-display-card-header">
					<img
						className="card-team-logo"
						src={"soccer_images/" + selectedTeam + ".png"}
						alt="Logo"
						height="50"
						width="50"
					/>
					<h2 className="team-name"> {teamData.name}</h2>
				</div>
				<div className="card-body">
					<div className="team-display-card-container">
						<div className="team-display-card-info">
							<div className="parent-div card-data-row">
								<div className="left-child">
									{cardHeaders.place}:
									{returnWithPlacingSuffix(teamData.place.toString())}
								</div>
								<div className="right-child">
									{cardHeaders.w}: {teamData.w}
								</div>
								<div className="right-child">
									{cardHeaders.d}: {teamData.d}
								</div>
								<div className="left-child">
									{cardHeaders.l}: {teamData.l}
								</div>
							</div>
							<div className="parent-div card-data-row">
								<div className="left-child">
									{cardHeaders.gp}: {teamData.gp}
								</div>
								<div className="right-child">
									{cardHeaders.gf}: {teamData.gf}
								</div>
								<div className="left-child">
									{cardHeaders.ga}: {teamData.ga}
								</div>
								<div className="right-child">
									{cardHeaders.gd}: {teamData.gd}
								</div>
							</div>
							<div className="card-data-row">
								{renderLastTenMatches(schedule, matchWeek)}
							</div>
						</div>
					</div>
					<p className="card-body-header">Team Schedule:</p>
					<SoccerTeamSchedule
						schedule={schedule}
						teamName={teamData.name}
						teamInt={selectedTeam}
					/>
				</div>
			</div>
		</>
	);
}

export default TeamDisplay;

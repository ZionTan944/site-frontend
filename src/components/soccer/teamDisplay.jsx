import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import soccerActionTypes from "../../actions/soccerActions";
import { GiCancel } from "react-icons/gi";
import { VscFlame } from "react-icons/vsc";
import { WiSnowflakeCold } from "react-icons/wi";

import { returnWithPlacingSuffix } from "../../utils/utilFunctions";
import SoccerTeamSchedule from "./soccerTeamSchedule";
import ProgressBar from "../common/progressBar";
import Spinner from "../common/spinner";

function TeamDisplay({ setTeamForCard, index }) {
	var dispatch = useDispatch();
	const leagueData = useSelector((state) => state.soccerLeague.leagueData);
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);

	const selectedTeams = useSelector((state) => state.soccerTeam.selectedTeam);
	const selectedTeam = selectedTeams[index];
	const teamData = useSelector((state) => state.soccerTeam.selectedTeamData)[
		index
	];
	const mainLoading = useSelector((state) => state.loader.soccerLoading);
	const loading = useSelector((state) => state.loader.soccerTeamLoading);

	const schedule = useSelector(
		(state) => state.soccerTeam.selectedTeamSchedule
	)[index];

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
		if (selectedTeams !== ["", ""]) {
			dispatch({
				type: soccerActionTypes.GET_TEAM_DATA,
				data: selectedTeams,
			});
		}
	}, [dispatch, selectedTeams, leagueData]);

	function returnMatchResult(result) {
		switch (result) {
			case (result = "W"):
				return "success-light-green";
			case (result = "L"):
				return "error-light-red";
			default:
				return "null-light-gray";
		}
	}

	function returnMatchResultText(result, opponent_name) {
		switch (result) {
			case (result = "W"):
				return `Won against ${opponent_name}`;
			case (result = "L"):
				return `Lost to ${opponent_name}`;
			default:
				return `Drew against ${opponent_name}`;
		}
	}

	function renderLastTenMatches(schedule, matchWeek) {
		if (matchWeek === 0) {
			return <>Expected Position at end of season : {teamData.ex}</>;
		}
		let selectedSchedule = [];
		for (var index = matchWeek - 1; index >= 0; index--) {
			if (
				selectedSchedule.length < Math.min(matchWeek, 10) &&
				schedule[index].opponent !== "RES"
			) {
				selectedSchedule.unshift(schedule[index]);
			}
			if (selectedSchedule.length >= 10) {
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
							key={match.opponent + "@" + index}
							className={
								"card-data-row circle extra-small-text element-centre " +
								returnMatchResult(match.result)
							}
							title={returnMatchResultText(match.result, match.opponent_name)}
						>
							{match.result}
						</div>
					);
				})}
			</>
		);
	}

	function renderTeamForm() {
		let formIcons = [];
		if (teamData.form >= 140) {
			formIcons = [...Array(Math.floor((teamData.form - 140) / 10) + 1)];
			return formIcons.map(() => {
				return (
					<VscFlame className="hot-icons form-icons large-text" size="20" />
				);
			});
		} else {
			formIcons = [...Array(Math.floor((140 - teamData.form) / 10) + 1)];
			return formIcons.map(() => {
				return (
					<WiSnowflakeCold
						className="cold-icons form-icons large-text"
						size="20"
					/>
				);
			});
		}
	}

	if (Object.keys(teamData).length === 0 || mainLoading) {
		return null;
	}

	return (
		<>
			{loading ? (
				<div className="top-display-card team-display-card card-dark border ">
					<Spinner
						type="clip"
						isLoading={loading}
						text={"Rendering Team Info"}
					/>
				</div>
			) : (
				<div className="top-display-card team-display-card border card-light">
					<div className="team-display-card-header">
						<img
							className="card-team-logo"
							src={"soccer_images/" + teamData.team_int + ".png"}
							alt="Logo"
							height="50"
							width="50"
						/>
						<h2 className="team-name">{selectedTeam}</h2>
						<GiCancel
							className="float-right cancel-icon"
							onClick={() => setTeamForCard("", index)}
						/>
					</div>
					<div>
						<div className="display-card-container">
							<div className="team-display-card-info">
								<div className="parent-div card-data-row">
									<div className="flex-left-child">
										{cardHeaders.place}:
										{returnWithPlacingSuffix(teamData.place.toString())}
									</div>
									<div className="flex-right-child">
										{cardHeaders.w}: {teamData.w}
									</div>
									<div className="flex-right-child">
										{cardHeaders.d}: {teamData.d}
									</div>
									<div className="flex-left-child">
										{cardHeaders.l}: {teamData.l}
									</div>
								</div>
								<div className="parent-div card-data-row">
									<div className="flex-left-child">
										{cardHeaders.gp}: {teamData.gp}
									</div>
									<div className="flex-right-child">
										{cardHeaders.gf}: {teamData.gf}
									</div>
									<div className="flex-left-child">
										{cardHeaders.ga}: {teamData.ga}
									</div>
									<div className="flex-right-child">
										{cardHeaders.gd}: {teamData.gd}
									</div>
								</div>
								<div className="card-data-row">
									<ProgressBar
										percentage={teamData.fitness}
										label={"Fitness"}
									/>
								</div>
								<div className="card-data-row">Form: {renderTeamForm()}</div>

								<div className="card-data-row">
									{renderLastTenMatches(schedule, matchWeek)}
								</div>
							</div>
						</div>
						<SoccerTeamSchedule
							schedule={schedule}
							teamName={selectedTeam}
							teamInt={teamData.team_int}
							setTeamForCard={setTeamForCard}
						/>
					</div>
				</div>
			)}
		</>
	);
}

export default TeamDisplay;

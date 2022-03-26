import { useSelector } from "react-redux";

function StatsCard() {
	const extraStats = useSelector((state) => state.soccerLeague.extraStats);
	const matchWeek = useSelector((state) => state.soccerLeague.matchWeek);
	const leagueData = useSelector((state) => state.soccerLeague.leagueData);

	function returnMatchText(latest_game) {
		var result = latest_game.result;
		switch (result) {
			case (result = "W"):
				return `${latest_game.gf}-${latest_game.ga} win`;
			case (result = "D"):
				if (latest_game.gf === 0) {
					return `nil nil draw`;
				}
				return `${latest_game.gf} all draw`;
			case (result = "L"):
				return `${latest_game.ga}-${latest_game.gf} loss`;
			default:
				return "Draw";
		}
	}
	function returnMatchDescription(team, form) {
		if (matchWeek === 1) {
			if (form === "hot") {
				return (
					<div className="soccer-desc-header small-text">
						{team.team_name} are starting the season strong with a{" "}
						{returnMatchText(team.latest_game)} against{" "}
						{team.latest_game.opponent_name}
					</div>
				);
			} else if (form === "cold") {
				return (
					<div className="soccer-desc-header small-text">
						{team.team_name} are starting the season poorly with a{" "}
						{returnMatchText(team.latest_game)} against{" "}
						{team.latest_game.opponent_name}
					</div>
				);
			}
		} else {
			if (form === "hot") {
				return (
					<div className="soccer-desc-header small-text">
						{team.team_name} are in good form with a recent{" "}
						{returnMatchText(team.latest_game)} against{" "}
						{team.latest_game.opponent_name}
					</div>
				);
			} else if (form === "cold") {
				return (
					<div className="soccer-desc-header small-text">
						{team.team_name}'s troubles continue, with a{" "}
						{returnMatchText(team.latest_game)} against{" "}
						{team.latest_game.opponent_name}
					</div>
				);
			}
		}
	}
	function renderPredictions(matchWeek) {
		if (matchWeek === 0) {
			return (
				<>
					<h2 className="display-card-header">Season Predictions:</h2>
					<div className="card-body">
						<div className="display-card-container border-dash element-centre">
							<div className="soccer-desc-header normal-text">
								{leagueData[0]["Team Name"]} is predicted to win the league with{" "}
								{leagueData[1]["Team Name"]} right on their tail.
							</div>
							<div className="soccer-desc-header normal-text">
								Fans of{" "}
								{leagueData[Math.floor(leagueData.length / 2) - 1]["Team Name"]}
								, {leagueData[Math.floor(leagueData.length / 2)]["Team Name"]}{" "}
								and{" "}
								{leagueData[Math.floor(leagueData.length / 2) + 1]["Team Name"]}{" "}
								are expecting a mid table finish for their teams.
							</div>
							<div className="soccer-desc-header normal-text">
								Meanwhile, {leagueData[leagueData.length - 1]["Team Name"]},{" "}
								{leagueData[leagueData.length - 2]["Team Name"]} and{" "}
								{leagueData[leagueData.length - 3]["Team Name"]} are expected to
								have a tough season ahead.
							</div>
						</div>
					</div>
				</>
			);
		}
		var hotFTeam = extraStats.hot[0];
		var hotSTeam = extraStats.hot[1];
		var coldFTeam = extraStats.cold[0];
		var coldSTeam = extraStats.cold[1];

		return (
			<>
				<h2 className="display-card-header">Soccer News:</h2>
				<div className="card-body">
					<div className="display-card-container border-dash element-centre">
						<div>
							<div className="full-width text-centre underline soccer-desc-header">
								Rising Teams
							</div>
							{[hotFTeam, hotSTeam].map((team) => {
								return <>{returnMatchDescription(team, "hot")}</>;
							})}
							<div className="full-width text-centre underline soccer-desc-header">
								Falling Teams
							</div>
							{[coldFTeam, coldSTeam].map((team) => {
								return <>{returnMatchDescription(team, "cold")}</>;
							})}
						</div>
					</div>
				</div>
			</>
		);
	}
	return (
		<div className="display-card top-layer-card card-light border ">
			{renderPredictions(matchWeek)}
		</div>
	);
}

export default StatsCard;

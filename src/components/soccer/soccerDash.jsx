import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import soccerActionTypes from "../../actions/soccerActions";
import commonActionTypes from "../../actions/commonActions";

import { GiSoccerBall } from "react-icons/gi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import TableDisplay from "./tableDisplay";
import TeamDisplay from "./teamDisplay";
import MatchDisplay from "./matchDisplay";
import StatsCard from "./statsCard";
import descriptionChildren from "./descriptionChildren";
import DescriptionBoard from "../common/descriptionBoard";
import Notification from "../common/notification";
import Spinner from "../common/spinner";

function SoccerDash() {
	var dispatch = useDispatch();
	var [isTeamCardVisible, setIsTeamCardVisible] = useState([false, false]);

	var [selectedLeague, setSelectedLeague] = useState(1);

	const leagueData = useSelector((state) => state.soccerLeague.leagueData);
	const selectedTeams = useSelector((state) => state.soccerTeam.selectedTeam);
	const loading = useSelector((state) => state.loader.soccerLoading);
	var [isBoardShown, setIsBoardShown] = useState(false);

	function setTeamForCard(team, index = null) {
		if (team === "" && index !== null) {
			if (index === 0) {
				setIsTeamCardVisible([false, isTeamCardVisible[1]]);
			} else {
				setIsTeamCardVisible([isTeamCardVisible[0], false]);
			}
			dispatch({
				type: soccerActionTypes.UNSET_SELECTED_TEAM,
				data: { index: index },
			});
		} else {
			if (selectedTeams.includes(team)) {
				dispatch({
					type: commonActionTypes.SET_ALERT,
					data: {
						alertType: "warning",
						alertMessage: "Don't select the same team.",
					},
				});
			} else if (isTeamCardVisible[0] === false) {
				setIsTeamCardVisible([team, isTeamCardVisible[1]]);
				dispatch({
					type: soccerActionTypes.SET_SELECTED_TEAM,
					data: team,
				});
			} else if (isTeamCardVisible[1] === false) {
				setIsTeamCardVisible([isTeamCardVisible[0], team]);
				dispatch({
					type: soccerActionTypes.SET_SELECTED_TEAM,
					data: team,
				});
			} else {
				dispatch({
					type: commonActionTypes.SET_ALERT,
					data: {
						alertType: "warning",
						alertMessage: "Close one team card to open another.",
					},
				});
			}
		}
	}

	useEffect(() => {
		dispatch({
			type: soccerActionTypes.RESTART_SOCCER_LEAGUE,
			data: selectedLeague,
		});
		setIsTeamCardVisible([false, false]);
	}, [dispatch, selectedLeague]);

	function renderTeamDisplay(isTeamCardVisible, index) {
		if (isTeamCardVisible[index]) {
			return <TeamDisplay setTeamForCard={setTeamForCard} index={index} />;
		}
		return (
			<div className="top-display-card team-display-card card-dark border">
				<div className="team-display-card-header">
					<h2 className="team-name">Team Info Card</h2>
				</div>
				<div className="card-body">
					<div className="display-card-message display-card-container border-dash element-centre">
						<div className="text-centre">
							<AiOutlineInfoCircle />
							Select a team by clicking to view additional team information
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			{loading || leagueData.length === 0 ? (
				<Spinner
					type="rotate"
					isLoading={loading}
					text={"Try refreshing the Page if loading persists"}
				/>
			) : (
				<>
					<Notification />

					<DescriptionBoard
						isBoardShown={isBoardShown}
						setIsBoardShown={setIsBoardShown}
						children={descriptionChildren()}
					/>
					<div className="soccer-display">
						<div className="soccer-header">
							<label htmlFor="league" className="header-1">
								<GiSoccerBall /> Soccer League Simulator:
							</label>
							<select
								className="soccer-select header-1 sec-color-hover"
								name="league"
								id="league"
								onChange={(event) => setSelectedLeague(event.target.value)}
								value={selectedLeague}
							>
								<option value="1">English Premier League</option>
								<option value="2">English Football League</option>
							</select>
						</div>
						<div className="parent-div	">
							<div className="flex-basis-forty">
								<TableDisplay
									setIsTeamCardVisible={setIsTeamCardVisible}
									selectedLeague={selectedLeague}
									setTeamForCard={setTeamForCard}
								/>
							</div>
							<div className="display-flex-col flex-basis-sixty">
								<div className="display-flex-row">
									<div className="flex-basis-sixty">
										<MatchDisplay setTeamForCard={setTeamForCard} />
									</div>
									<div className="flex-basis-forty">
										<StatsCard />
									</div>
								</div>
								<div className="display-flex-row team-card-row">
									<div className="flex-basis-half">
										{renderTeamDisplay(isTeamCardVisible, 0)}
									</div>
									<div className="flex-basis-half">
										{renderTeamDisplay(isTeamCardVisible, 1)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default SoccerDash;

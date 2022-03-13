import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import soccerActionTypes from "../../actions/soccerActions";
import { GiSoccerBall } from "react-icons/gi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import TableDisplay from "./tableDisplay";
import TeamDisplay from "./teamDisplay";
import MatchDisplay from "./matchDisplay";
import descriptionChildren from "./descriptionChildren";
import DescriptionBoard from "../common/descriptionBoard";
import Spinner from "../common/spinner";

function SoccerDash() {
	var dispatch = useDispatch();
	var [isTeamCardVisible, setIsTeamCardVisible] = useState(false);

	var [selectedLeague, setSelectedLeague] = useState(1);

	const loading = useSelector((state) => state.loader.loading);
	var [isBoardShown, setIsBoardShown] = useState(false);

	useEffect(() => {
		dispatch({
			type: soccerActionTypes.RESTART_SOCCER_LEAGUE,
			data: selectedLeague,
		});
		setIsTeamCardVisible(false);
	}, [dispatch, selectedLeague]);

	function renderTeamDisplay(isTeamCardVisible) {
		if (isTeamCardVisible) {
			return <TeamDisplay setIsTeamCardVisible={setIsTeamCardVisible} />;
		}
		return (
			<div className="top-display-card team-display-card card-dark border flex-child-2">
				<div className="team-display-card-header">
					<h2 className="team-name">Team Info Card</h2>
				</div>
				<div className="card-body">
					<div className="team-display-card-message team-display-card-container border-dash element-centre">
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
		<div>
			<DescriptionBoard
				isBoardShown={isBoardShown}
				setIsBoardShown={setIsBoardShown}
				children={descriptionChildren()}
			/>
			<div className="soccer-display">
				<Spinner type="rotate" isLoading={loading} />
				<div className="soccer-header">
					<label htmlFor="league" className="header-1">
						<GiSoccerBall /> Soccer League Simulator:
					</label>
					<select
						className="soccer-select header-1 sec-color-hover"
						name="league"
						id="league"
						onChange={(event) => setSelectedLeague(event.target.value)}
					>
						<option value="1">English Premier League</option>
						<option value="2">English Football League</option>
					</select>
				</div>
				<div className="parent-div">
					<div className="flex-left-child">
						<TableDisplay
							setIsTeamCardVisible={setIsTeamCardVisible}
							selectedLeague={selectedLeague}
						/>
					</div>
					<div className="flex-right-child display-flex-col">
						{renderTeamDisplay(isTeamCardVisible)}
						<MatchDisplay setIsTeamCardVisible={setIsTeamCardVisible} />
						<div className="team-display-card card-dark border flex-child"></div>
						<div className="team-display-card card-dark border flex-child">
							<div className="team-display-card-header">
								<h2 className="team-name">Team Info Card</h2>
							</div>
							<div className="card-body element-centre">
								<div className="team-display-card-container border-dash text-centre">
									<p>
										<AiOutlineInfoCircle />
										Select a team by clicking to view additional team
										information
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SoccerDash;

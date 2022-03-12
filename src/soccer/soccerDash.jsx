import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import soccerActionTypes from "../actions/soccerActions";
import { GiSoccerBall } from "react-icons/gi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import TableDisplay from "./tableDisplay";
import TeamDisplay from "./teamDisplay";
import MatchDisplay from "./matchDisplay";
import DescriptionBoard from "../components/descriptionBoard";
import descriptionChildren from "./descriptionChildren";
import Spinner from "../components/spinner";

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
			<div className="top-display-card team-display-card card-dark border flex-child">
				<div className="team-display-card-header">
					<h2 className="team-name">Team Info Card</h2>
				</div>
				<div className="card-body">
					<div className="team-display-card-container border-dash text-centre">
						<p>
							<AiOutlineInfoCircle />
							Select a team by clicking to view additional team information
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="soccer-display">
			<DescriptionBoard
				isBoardShown={isBoardShown}
				setIsBoardShown={setIsBoardShown}
				children={descriptionChildren()}
			/>
			<Spinner type="rotate" isLoading={loading} />

			<label htmlFor="league" className="header-1 soccer-header">
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
			<div className="parent-div">
				<div className="left-child">
					<TableDisplay
						setIsTeamCardVisible={setIsTeamCardVisible}
						selectedLeague={selectedLeague}
					/>
				</div>
				<div className="right-child display-flex-col">
					{renderTeamDisplay(isTeamCardVisible)}
					<MatchDisplay setIsTeamCardVisible={setIsTeamCardVisible} />
					<div className="team-display-card card-dark border flex-child">
						<div className="team-display-card-header">
							<h2 className="team-name">Team Info Card</h2>
						</div>
						<div className="card-body element-centre">
							<div className="team-display-card-container border-dash text-centre">
								<p>
									<AiOutlineInfoCircle />
									Select a team by clicking to view additional team information
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SoccerDash;

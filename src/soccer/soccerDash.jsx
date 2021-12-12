import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableDisplay from "./tableDisplay";
import soccerActionTypes from "../actions/soccerActions";

function SoccerDash() {
	var dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: soccerActionTypes.GET_LEAGUE_NAME,
		});
	}, [dispatch]);

	const leagueName = useSelector((state) => state.soccerReducer.leagueName);

	return (
		<div className="soccer-display">
			<h1>Soccer Simulator: {leagueName}</h1>
			<div className="parent-div">
				<div className="left-child">
					<TableDisplay />
				</div>
				<div className="right-child">
					<p>sds</p>
				</div>
			</div>
		</div>
	);
}

export default SoccerDash;

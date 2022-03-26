import { GiSoccerBall } from "react-icons/gi";

function DashBoard() {
	return (
		<div>
			<div className="parent-div">
				<div className="flex-left-child">
					<a href="/soccer">
						<div className="project-card card-light border">
							<h2 className="project-title">
								<GiSoccerBall /> Soccer Simulator Project
							</h2>
							<div className="project-description">
								A small project that will 'simulate' a full season of soccer of
								either the Premier League or English Championship with teams up
								to date as of the 2021/22 season. Main features include ability
								to select a team to view more information together with the use
								of merge sort to accurately order the league table. Click to
								find out more.
							</div>
						</div>
					</a>
				</div>
				<div className="flex-right-child">dd</div>
			</div>
		</div>
	);
}
export default DashBoard;

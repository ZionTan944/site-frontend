function descriptionChildren() {
	return (
		<div>
			<div className="underline normal-text soccer-desc-header">
				Explanation of Rules
			</div>
			<ol>
				<li>
					It is a round robin league where each Team will play every other team
					twice. One at home and one away. There are two additional "Rest" teams
					added to simulate rest weeks for teams, resulting in the total match
					weeks to be (n+1)*2 where n is the number of actual teams.
				</li>
				<li>
					Home teams have a slight advantage in games over away teams. Fatigue
					and Team Form that will affect game results are in the works
				</li>
				<li>
					Placing is determined by whichever team has the higest value in these
					categories. If there is no differentiating value, it is determined to
					be a draw between the teams.
				</li>
				<ol>
					<li>Points</li>
					<li>Goal Difference if Points are Equal</li>
					<li>Goals For if Points and Goal Difference are Equal</li>
				</ol>
			</ol>
			<div className="parent-div border">
				<div className="left-child">
					<h3 className="text-centre underline large-text">
						Frontend Features
					</h3>
					<ul className="soccer-desc-list small-text">
						<li>
							Uses React and Redux Saga as main framework libraries. Coded in
							Javascript XML
						</li>
						<li>
							Team cards can be accessed via clicking on team name in league
							table, match results or opposing teams in team cards scheduling.
							Team cards can then be closed using (x) icon on top left of card
						</li>
					</ul>
				</div>
				<div className="right-child">
					<h3 className="text-centre underline large-text">Backend Features</h3>
					<ul className="soccer-desc-list small-text">
						<li>
							Round robin tournament scheduling with one home and one away game
							against every other team with an even spread of home and away
							games, maximum allowed consecutively is 3
						</li>
						<li>
							Table is sorted using merge sort, a recursive sorting algorithmn
							based on the divide and conquer approach
						</li>
						<li>
							Uses Object Oriented Programming (OOP) approach with two objects,
							for the leagues and teams
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
export default descriptionChildren;

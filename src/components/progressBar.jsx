function ProgressBar({ percentage }) {
	function renderProgressBarColor(percentage) {
		if (percentage < 40) {
			return "error-red";
		} else if (percentage < 75 && percentage >= 40) {
			return "warning-yellow";
		} else {
			return "success-green";
		}
	}
	return (
		<div className="progress-bar-container">
			<div
				className={"progress-bar-inner " + renderProgressBarColor(percentage)}
				style={{ width: `${percentage}%` }}
			>
				{" "}
			</div>
		</div>
	);
}

export default ProgressBar;

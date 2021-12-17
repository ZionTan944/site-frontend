export function addItemInArray(array, index, newItem) {
	return [...array.slice(0, index), newItem, ...array.slice(index)];
}

export function returnWithPlacingSuffix(place) {
	if (place[place.length - 1] === "1" && place !== "11") {
		return place + "st";
	} else if (place[place.length - 1] === "2" && place !== "12") {
		return place + "nd";
	} else if (place[place.length - 1] === "3" && place !== "13") {
		return place + "rd";
	} else {
		return place + "th";
	}
}

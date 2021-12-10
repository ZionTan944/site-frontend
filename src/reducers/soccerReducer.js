const initState = {
  leagueData: [],
  matchData: [],
  matchDay: 1,
};

const soccerReducer = (state = initState, action) => {
  return {
    ...state,
    // leagueData: action.result.data.League,
    // matchData: action.result.data.Matches,
    // matchDay: action.result.data.Day,
  };
};

export default soccerReducer;

import { createReducer } from "redux-starter-kit";
import { selectRecommendationSeed } from "redux/actions";
import { MAX_SELECTABLE_SEEDS } from "../../constants";

const initialState = {
  recommendationSeeds: [],
  recommendedTracks: []
};

const addOrRemoveRecommendationSeed = (curr, item) => {
  const isPrevSelected = x => x.id === item.id;
  if (curr.some(isPrevSelected)) {
    return curr.filter(e => !isPrevSelected(e));
  }

  if (curr.length < MAX_SELECTABLE_SEEDS) {
    return [...curr, item];
  }

  return [...curr];
};

const recommendationsReducer = createReducer(initialState, {
  // Handle some sort of error reporting for too many seeds selected here
  [selectRecommendationSeed]: (state, action) => {
    let newRecommendationSeeds = addOrRemoveRecommendationSeed(
      state.recommendationSeeds,
      action.payload
    );

    return {
      ...state,
      recommendationSeeds: newRecommendationSeeds
    };
  },
  API_FETCH_RECOMMENDED_TRACKS_SUCCESS: (state, action) => {
    return {
      ...state,
      recommendedTracks: action.response.tracks
    };
  }
});

export default recommendationsReducer;

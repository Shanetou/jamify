import { createReducer } from 'redux-starter-kit';
import { selectArtist, searchArtist } from 'redux/actions';
import { MAX_SELECTABLE_SEEDS } from '../../constants';

// import { addRecommendationSeed } from "./helpers";

const initialState = {
  recommendationSeeds: [],
  recommendedTracks: []
};

const addOrRemoveRecSeed = (curr, item) => {
  const isPrevSelected = x => x.id === item.id;
  if (curr.some(isPrevSelected)) {
    return curr.filter(e => !isPrevSelected(e));
  }

  if (curr.length < MAX_SELECTABLE_SEEDS) {
    return [...curr, item];
  }

  return curr;
};

const recommendationsReducer = createReducer(initialState, {
  // Handle some sort of error reporting for too many seeds selected here
  [selectArtist]: (state, action) => {
    console.log('state:', state.recommendationSeeds);
    console.log('action:', action);

    let newRecommendationSeeds = addOrRemoveRecSeed(
      state.recommendationSeeds,
      action.payload
    );

    // let newRecommendationSeeds = addRecommendationSeed(
    //   action.payload.id,
    //   state.recommendationSeeds
    // );

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

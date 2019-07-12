import { createReducer } from 'redux-starter-kit';
import { selectArtist, searchArtist } from 'redux/actions';
// import { addRecommendationSeed } from "./helpers";

const initialState = {
  recommendationSeeds: [],
  recommendedTracks: []
};

const tracksReducer = createReducer(initialState, {
  // Handle some sort of error reporting for too many seeds selected here
  // [selectArtist]: (state, action) => {
  //   console.log("state:", state.recommendationSeeds);
  //   console.log("action:", action);

  //   let newRecommendationSeeds = addRecommendationSeed(
  //     action.payload.id,
  //     state.recommendationSeeds
  //   );

  //   return {
  //     ...state,
  //     recommendationSeeds: newRecommendationSeeds
  //   };
  // },
  API_FETCH_RECOMMENDED_TRACKS_SUCCESS: (state, action) => {
    return {
      ...state,
      recommendedTracks: action.response.tracks
    };
  }
});

export default tracksReducer;

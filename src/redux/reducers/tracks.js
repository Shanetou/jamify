import { createReducer } from 'redux-starter-kit';

const initialState = {
  recommendedTracks: []
};

const userReducer = createReducer(initialState, {
  API_FETCH_RECOMMENDED_TRACKS_SUCCESS: (state, action) => {
    return {
      ...state,
      recommendedTracks: action.response.tracks
    };
  }
});

export default userReducer;

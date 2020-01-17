import { createReducer } from "redux-starter-kit";

const initialState = {
  isAddToSpotifyPending: false
};

const playlistsReducer = createReducer(initialState, {
  SET_ADD_TO_SPOTIFY_STARTED: (state, action) => {
    return {
      isAddToSpotifyPending: true
    };
  },
  SET_ADD_TO_SPOTIFY_FINISHED: (state, action) => {
    return {
      isAddToSpotifyPending: false
    };
  }
});

export default playlistsReducer;

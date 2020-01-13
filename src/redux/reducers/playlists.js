import { createReducer } from "redux-starter-kit";

const initialState = {
  isRequestPending: false
};

const playlistsReducer = createReducer(initialState, {
  SET_ADD_TO_SPOTIFY_STARTED: (state, action) => {
    return {
      isRequestPending: true
    };
  },
  SET_ADD_TO_SPOTIFY_FINISHED: (state, action) => {
    return {
      isRequestPending: false
    };
  }
});

export default playlistsReducer;

import { createReducer } from 'redux-starter-kit';

const initialState = {};

const playlistsReducer = createReducer(initialState, {
  API_CREATE_PLAYLIST_SUCCESS: (state, action) => {
    return {
      ...state
    };
  }
});

export default playlistsReducer;

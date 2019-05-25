import { createReducer } from 'redux-starter-kit';

import { createPlaylist } from 'redux/actions';

const initialState = {};

const playlistsReducer = createReducer(initialState, {
  API_CREATE_PLAYLIST_SUCCESS: (state, action) => {
    return {
      ...state
    };
  }
});

export default playlistsReducer;

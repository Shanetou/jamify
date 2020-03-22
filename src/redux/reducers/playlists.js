import { createReducer } from "redux-starter-kit";
import { setAddToSpotifyFinished, setAddToSpotifyStarted } from "redux/actions";

const initialState = {
  isAddToSpotifyPending: false
};

const playlistsReducer = createReducer(initialState, {
  [setAddToSpotifyFinished]: (_state, _action) => ({
    isAddToSpotifyPending: false
  }),
  [setAddToSpotifyStarted]: (_state, _action) => ({
    isAddToSpotifyPending: true
  })
});

export default playlistsReducer;

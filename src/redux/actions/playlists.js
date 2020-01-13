import { createAction } from "redux-starter-kit";

export const createPlaylist = createAction("CREATE_PLAYLIST");
// Remove this if it's no longer used
export const addSongsToPlaylist = createAction("ADD_SONGS_TO_PLAYLIST");

export const createAndPopulatePlaylist = createAction(
  "CREATE_AND_POPULATE_PLAYLIST"
);

export const setAddToSpotifyStarted = createAction(
  "SET_ADD_TO_SPOTIFY_STARTED"
);
export const setAddToSpotifyFinished = createAction(
  "SET_ADD_TO_SPOTIFY_FINISHED"
);

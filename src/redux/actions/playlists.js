import { createAction } from "redux-starter-kit";

export const addSongsToPlaylist = createAction("ADD_SONGS_TO_PLAYLIST");
export const createAndPopulatePlaylist = createAction(
  "CREATE_AND_POPULATE_PLAYLIST"
);
export const createPlaylist = createAction("CREATE_PLAYLIST");
export const setAddToSpotifyFinished = createAction(
  "SET_ADD_TO_SPOTIFY_FINISHED"
);
export const setAddToSpotifyStarted = createAction(
  "SET_ADD_TO_SPOTIFY_STARTED"
);

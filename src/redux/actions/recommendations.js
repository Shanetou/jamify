import { createAction } from "redux-starter-kit";

export const deselectAllTracks = createAction("DESELECT_ALL_TRACKS");
export const fetchTracks = createAction("FETCH_RECOMMENDED_TRACKS");
export const selectAllTracks = createAction("SELECT_ALL_TRACKS");
export const selectRecommendationSeed = createAction(
  "SELECT_RECOMMENDATION_SEED"
);
export const toggleTrack = createAction("TOGGLE_TRACK");

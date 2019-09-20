import { createAction } from "redux-starter-kit";

export const fetchTracks = createAction("FETCH_RECOMMENDED_TRACKS");
export const toggleTrack = createAction("TOGGLE_TRACK");
export const selectAllTracks = createAction("SELECT_ALL_TRACKS");
export const deselectAllTracks = createAction("DESELECT_ALL_TRACKS");
export const selectRecommendationSeed = createAction(
  "SELECT_RECOMMENDATION_SEED"
);

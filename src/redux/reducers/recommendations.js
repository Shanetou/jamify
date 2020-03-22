import { createReducer } from "redux-starter-kit";
import {
  deselectAllTracks,
  selectAllTracks,
  selectRecommendationSeed,
  toggleTrack
} from "redux/actions";
import { MAX_SELECTABLE_SEEDS } from "../../constants";
import { arrayToObject } from "../../utils";

const initialState = {
  isTracksRequestPending: false,
  recommendationSeeds: [],
  tracks: {},
  selectedTracks: []
};

const addOrRemoveTrack = (selectedUris, trackUri) => {
  const isPrevSelected = selectedUris.includes(trackUri);
  if (isPrevSelected) {
    return selectedUris.filter(item => item !== trackUri);
  }
  return [...selectedUris, trackUri];
};

const addOrRemoveRecommendationSeed = (curr, item) => {
  const isPrevSelected = x => x.id === item.id;
  if (curr.some(isPrevSelected)) {
    return curr.filter(e => !isPrevSelected(e));
  }

  if (curr.length < MAX_SELECTABLE_SEEDS) {
    return [...curr, item];
  }

  return [...curr];
};

const recommendationsReducer = createReducer(initialState, {
  API_FETCH_RECOMMENDED_TRACKS_STARTED: (state, _action) => ({
    ...state,
    isTracksRequestPending: true
  }),
  API_FETCH_RECOMMENDED_TRACKS_COMPLETED: (state, _action) => ({
    ...state,
    isTracksRequestPending: false
  }),
  API_FETCH_RECOMMENDED_TRACKS_SUCCESS: (state, action) => {
    const { tracks } = action.response;
    const tracksDict = arrayToObject(tracks, "uri");

    return {
      ...state,
      tracks: tracksDict,
      // Auto-select all tracks when they come in
      selectedTracks: Object.keys(tracksDict)
    };
  },
  [deselectAllTracks]: (state, _action) => ({
    ...state,
    selectedTracks: []
  }),
  [selectAllTracks]: (state, _action) => ({
    ...state,
    selectedTracks: Object.keys(state.tracks)
  }),
  [selectRecommendationSeed]: (state, action) => {
    const newRecommendationSeeds = addOrRemoveRecommendationSeed(
      state.recommendationSeeds,
      action.payload
    );

    return {
      ...state,
      recommendationSeeds: newRecommendationSeeds
    };
  },
  [toggleTrack]: (state, action) => {
    const trackUri = action.payload;
    const selectedTracks = addOrRemoveTrack(state.selectedTracks, trackUri);

    return {
      ...state,
      selectedTracks
    };
  }
});

export default recommendationsReducer;

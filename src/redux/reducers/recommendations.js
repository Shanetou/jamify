import { createReducer } from "redux-starter-kit";
import {
  selectRecommendationSeed,
  toggleTrack,
  selectAllTracks,
  deselectAllTracks
} from "redux/actions";
import { MAX_SELECTABLE_SEEDS } from "../../constants";
import { arrayToObject } from "../../utils";

const initialState = {
  recommendationSeeds: [],
  tracks: {},
  // array(uri)
  selectedTracks: []
};

const addOrRemoveTrack = (selectedUris, trackUri) => {
  const isPrevSelected = selectedUris.includes(trackUri);
  if (isPrevSelected) {
    return selectedUris.filter(item => item !== trackUri);
  } else {
    return [...selectedUris, trackUri];
  }
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
  // Handle some sort of error reporting for too many seeds selected here
  [selectRecommendationSeed]: (state, action) => {
    let newRecommendationSeeds = addOrRemoveRecommendationSeed(
      state.recommendationSeeds,
      action.payload
    );

    return {
      ...state,
      recommendationSeeds: newRecommendationSeeds
    };
  },
  API_FETCH_RECOMMENDED_TRACKS_SUCCESS: (state, action) => {
    const tracks = action.response.tracks;
    const tracksDict = arrayToObject(tracks, "uri");

    return {
      ...state,
      tracks: tracksDict,
      // Auto-select all tracks when they come in
      selectedTracks: Object.keys(tracksDict)
    };
  },
  [toggleTrack]: (state, action) => {
    const trackUri = action.payload;
    const selectedTracks = addOrRemoveTrack(state.selectedTracks, trackUri);

    return {
      ...state,
      selectedTracks
    };
  },
  [selectAllTracks]: (state, _action) => {
    return {
      ...state,
      selectedTracks: Object.keys(state.tracks)
    };
  },
  [deselectAllTracks]: (state, _action) => {
    return {
      ...state,
      selectedTracks: []
    };
  }
});

export default recommendationsReducer;

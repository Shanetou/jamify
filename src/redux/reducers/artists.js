import { createReducer } from "redux-starter-kit";
import { SEED_TYPES } from "../../constants";

const initialState = {
  artists: [],
  selected: [],
  searchResults: []
};

let normalizedArtists = artists => {
  return artists.map(artist => ({
    seedType: SEED_TYPES.artist,
    ...artist
  }));
};

const artistReducer = createReducer(initialState, {
  // [selectArtist]: (state, action) => {
  //   const { selected } = state;
  //   const { payload } = action;

  //   return {
  //     ...state,
  //     selected: addOrRemoveArtist(selected, payload)
  //   };
  // },
  // [searchArtist]: (state, action) => {
  //   return {
  //     ...state
  //   };
  // },
  API_SEARCH_ARTIST_SUCCESS: (state, action) => {
    let artists = normalizedArtists(action.response.artists.items);

    return {
      ...state,
      searchResults: artists
    };
  },
  API_FETCH_TOP_ARTISTS_SUCCESS: (state, action) => {
    let artists = normalizedArtists(action.response.items);

    return {
      ...state,
      // Just pulling out the items array here
      // there are lots of other attributes in the resp
      // including pagination links and total items length
      artists: artists
    };
  }
});

export default artistReducer;

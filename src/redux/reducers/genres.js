import { createReducer } from "redux-starter-kit";

import { MAX_SELECTABLE_SEEDS, SEED_TYPES } from "../../constants";

const initialState = {
  recommendationGenres: [],
  filteredGenres: [],
  selected: []
};

let normalizeGenres = genres =>
  genres.map(genre => ({
    seedType: SEED_TYPES.genre,
    id: genre,
    name: genre
  }));

// TODO: Implement fuzzy search
const filterGenresByText = (allGenres, filterText) => {
  if (filterText === "") {
    return allGenres;
  }

  const normalizedFilterText = filterText.toLowerCase();
  return allGenres.filter(genre => genre.name.includes(normalizedFilterText));
};

const addOrRemoveGenre = (prevSelected, newItem) => {
  const wasPrevSelected = x => x === newItem;
  if (prevSelected.some(wasPrevSelected)) {
    return prevSelected.filter(e => !wasPrevSelected(e));
  }

  if (prevSelected.length < MAX_SELECTABLE_SEEDS) {
    return [...prevSelected, newItem];
  }

  return prevSelected;
};

const genresReducer = createReducer(initialState, {
  API_FETCH_RECOMMENDATION_GENRES_SUCCESS: (state, action) => {
    let normalizedGenres = normalizeGenres(action.response.genres);

    return {
      ...state,
      filteredGenres: normalizedGenres,
      recommendationGenres: normalizedGenres
    };
  },
  FILTER_GENRES: (state, action) => {
    const filterText = action.payload;
    const allGenres = state.recommendationGenres;

    return {
      ...state,
      filteredGenres: filterGenresByText(allGenres, filterText)
    };
  },
  SELECT_GENRE: (state, action) => {
    const prevSelected = state.selected;
    const newItem = action.payload;

    return {
      ...state,
      selected: addOrRemoveGenre(prevSelected, newItem)
    };
  }
});

export default genresReducer;

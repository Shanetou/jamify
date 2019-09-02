import { createReducer } from "redux-starter-kit";

import { SEED_TYPES } from "../../constants";

const initialState = {
  recommendationGenres: [],
  filteredGenres: []
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
  }
});

export default genresReducer;

import { createReducer } from "redux-starter-kit";
import { SEED_TYPES } from "../../constants";
import { filterGenres } from "../actions";

const initialState = {
  recommendationGenres: [],
  filteredGenres: []
};

const normalizeGenres = genres =>
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
    const normalizedGenres = normalizeGenres(action.response.genres);

    return {
      ...state,
      filteredGenres: normalizedGenres,
      recommendationGenres: normalizedGenres
    };
  },
  [filterGenres]: (state, action) => {
    const filterText = action.payload;
    const allGenres = state.recommendationGenres;

    return {
      ...state,
      filteredGenres: filterGenresByText(allGenres, filterText)
    };
  }
});

export default genresReducer;

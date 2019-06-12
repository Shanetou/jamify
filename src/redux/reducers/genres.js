import { createReducer } from 'redux-starter-kit';
import { filterGenres } from '../actions';

import { MAX_SELECTABLE_SEEDS } from '../../constants';

const initialState = {
  recommendationGenres: [],
  filteredGenres: [],
  selected: []
};

// TODO: Implement fuzzy search
const filterGenresByText = (allGenres, filterText) => {
  const normalizedFilterText = filterText.toLowerCase();
  if (filterText === '') {
    return allGenres;
  }

  return allGenres.filter(genre => genre.includes(normalizedFilterText));
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
    return {
      ...state,
      filteredGenres: action.response.genres,
      recommendationGenres: action.response.genres
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

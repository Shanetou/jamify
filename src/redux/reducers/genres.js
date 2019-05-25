import { createReducer } from 'redux-starter-kit';

const initialState = {
  recommendationGenres: [],
  selected: []
};

const genresReducer = createReducer(initialState, {
  API_FETCH_RECOMMENDATION_GENRES_SUCCESS: (state, action) => {
    return {
      ...state,
      recommendationGenres: action.response.genres
    };
  },
  SELECT_GENRE: (state, action) => {
    return {
      ...state,
      selected: action.payload
    };
  }
});

export default genresReducer;

import { createAction } from 'redux-starter-kit';

export const fetchRecommendationGenres = createAction(
  'FETCH_RECOMMENDATION_GENRES'
);

export const selectGenre = createAction('SELECT_GENRE');

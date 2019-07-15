import { createAction } from 'redux-starter-kit';

export const fetchRecommendedTracks = createAction('FETCH_RECOMMENDED_TRACKS');
export const selectRecommendationSeed = createAction(
  'SELECT_RECOMMENDATION_SEED'
);

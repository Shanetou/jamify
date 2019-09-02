import { createAction } from "redux-starter-kit";

export const fetchRecommendationGenres = createAction(
  "FETCH_RECOMMENDATION_GENRES"
);
export const filterGenres = createAction("FILTER_GENRES");

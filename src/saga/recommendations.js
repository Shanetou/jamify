import { tracksPath } from "../api/paths";
import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import {
  deselectAttribute,
  fetchTracks,
  selectAttribute,
  selectRecommendationSeed,
  setAttributeValue,
  showToast
} from "redux/actions";
import { MAX_SELECTABLE_SEEDS, TOASTS } from "../constants";
import { attributesSelector, recommendationSeedsSelector } from "../selectors";
import apiCall from "./apiCall";

function* fetchTracksTask(action) {
  const recommendationSeeds = yield select(recommendationSeedsSelector);
  const attributes = yield select(attributesSelector);
  const path = tracksPath(recommendationSeeds, attributes);

  yield fork(apiCall, action, path);
}

export function* watchFetchTracks() {
  yield takeEvery(fetchTracks, fetchTracksTask);
}

function* selectRecommendationSeedTask(_action) {
  const recommendationSeeds = yield select(recommendationSeedsSelector);
  const selectedSeedsCount = recommendationSeeds.length;

  if (selectedSeedsCount >= MAX_SELECTABLE_SEEDS) {
    yield put(showToast(TOASTS.MAX_SEEDS_SELECTED));
  } else if (selectedSeedsCount > 0) {
    yield put(fetchTracks());
  }
}

export function* watchSelectRecommendationSeed() {
  yield takeEvery(selectRecommendationSeed, selectRecommendationSeedTask);
}

function* updateRecommendationAttributesTask(_action) {
  const recommendationSeeds = yield select(recommendationSeedsSelector);

  if (recommendationSeeds.length > 0) {
    yield put(fetchTracks());
  }
}

export function* watchUpdateRecommendationAttributes() {
  yield takeEvery(
    [deselectAttribute, selectAttribute, setAttributeValue],
    updateRecommendationAttributesTask
  );
}

export default function* recommendations() {
  yield all([
    watchFetchTracks(),
    watchSelectRecommendationSeed(),
    watchUpdateRecommendationAttributes()
  ]);
}

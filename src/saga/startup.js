import { all, call, fork, put, take } from "redux-saga/effects";
import {
  fetchRecommendationGenres,
  fetchTopArtists,
  fetchUser,
  saveAccessToken
} from "../redux/actions";
import { RECOMMENDATION_GENRES_PATH, TOP_ARTISTS_PATH } from "../api/paths";
import apiCall from "./apiCall";

export function* watchFetchUser() {
  while (true) {
    const action = yield take(fetchUser);

    yield fork(apiCall, action, "me");
  }
}

export function* fetchUserTask() {
  yield put(fetchUser());
}

export function* watchFetchTopArtists() {
  while (true) {
    const action = yield take(fetchTopArtists);

    yield fork(apiCall, action, TOP_ARTISTS_PATH);
  }
}

export function* fetchTopArtistsTask() {
  yield put(fetchTopArtists());
}

export function* watchFetchRecommendationGenres() {
  while (true) {
    const action = yield take(fetchRecommendationGenres);

    yield fork(apiCall, action, RECOMMENDATION_GENRES_PATH);
  }
}

export function* fetchRecommendationGenresTask() {
  yield put(fetchRecommendationGenres());
}

function* getStartupData(accessToken) {
  yield fork(fetchUserTask, accessToken);
  yield fork(fetchTopArtistsTask, accessToken);
  yield fork(fetchRecommendationGenresTask, accessToken);
}

export function* getAccessToken() {
  const accessToken = new URLSearchParams(window.location.search).get(
    "access_token"
  );

  if (accessToken) {
    yield put(saveAccessToken(accessToken));
    yield call(getStartupData, accessToken);
  }
}

export default function* startup() {
  yield all([
    watchFetchUser(),
    watchFetchTopArtists(),
    watchFetchRecommendationGenres(),
    getAccessToken()
  ]);
}

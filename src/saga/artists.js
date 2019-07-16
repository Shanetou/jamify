import { all, fork, takeEvery } from "redux-saga/effects";
import { searchArtist } from "redux/actions";
import { getArtistsSearchPath } from "../api/paths";

import apiCall from "./apiCall";

export default function* artistsSaga() {
  yield all([
    // Start a watcher to handle search workflow
    fork(watchSearchArtist)
  ]);
}

function* searchArtistTask(action) {
  const { payload } = action;
  // const path = getRecommendedTracksPath(payload);
  const path = getArtistsSearchPath(payload);

  yield fork(apiCall, action, path);
}

export function* watchSearchArtist() {
  yield takeEvery(searchArtist, searchArtistTask);
}

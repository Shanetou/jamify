import { all, fork, takeEvery } from "redux-saga/effects";
import { searchArtist } from "../redux/actions";
import { getArtistsSearchPath } from "../api/paths";

import apiCall from "./apiCall";

function* searchArtistTask(action) {
  const { payload } = action;
  const path = getArtistsSearchPath(payload);

  yield fork(apiCall, action, path);
}

function* watchSearchArtist() {
  yield takeEvery(searchArtist, searchArtistTask);
}

export default function* artistsSaga() {
  yield all([
    // Start a watcher to handle search workflow
    fork(watchSearchArtist)
  ]);
}

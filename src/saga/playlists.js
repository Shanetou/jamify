import { all, call, takeLatest, select, put } from "redux-saga/effects";
import { createPlaylist } from "redux/actions";
import {
  addTracksToPlaylistData,
  addTracksToPlaylistPath,
  createPlaylistData,
  createPlaylistPath
} from "api/paths";
import apiCall from "./apiCall";
import { userSelector, selectedTracksSelector } from "../selectors";
import {
  showToast,
  addSongsToPlaylist,
  setAddToSpotifyStarted,
  setAddToSpotifyFinished,
  createAndPopulatePlaylist
} from "../redux/actions";
import { TOASTS } from "../constants";

function* addSongsToPlaylistTask(playlistId) {
  const selectedTracksURIs = yield select(selectedTracksSelector);
  const addTracksApiPath = addTracksToPlaylistPath(playlistId);
  const addTracksApiData = addTracksToPlaylistData(selectedTracksURIs);
  return yield call(
    apiCall,
    addSongsToPlaylist,
    addTracksApiPath,
    "POST",
    addTracksApiData
  );
}

function* createPlaylistTask(action) {
  const user = yield select(userSelector);
  const createPlaylistApiPath = createPlaylistPath(user.id);
  const createPlaylistApiData = createPlaylistData(new Date());
  return yield call(
    apiCall,
    action,
    createPlaylistApiPath,
    "POST",
    createPlaylistApiData
  );
}

function* createAndPopulatePlaylistTask(action) {
  yield put(setAddToSpotifyStarted());

  const createPlaylistResult = yield call(createPlaylistTask, action);
  const addSongsToPlaylistResult = yield call(
    addSongsToPlaylistTask,
    createPlaylistResult.id
  );

  if (addSongsToPlaylistResult.snapshot_id) {
    yield put(showToast(TOASTS.PLAYLIST_CREATED));
  }

  yield put(setAddToSpotifyFinished());
}

function* watchCreateAndPopulatePlaylistTask() {
  yield takeLatest(createAndPopulatePlaylist, createAndPopulatePlaylistTask);
}

export default function* tracks() {
  yield all([watchCreateAndPopulatePlaylistTask()]);
}

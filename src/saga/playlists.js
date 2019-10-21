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
import { showToast } from "../redux/actions";
import { TOASTS } from "../constants";

function* createPlaylistTask(action) {
  const user = yield select(userSelector);
  const createPlaylistApiPath = createPlaylistPath(user.id);
  const createPlaylistApiData = createPlaylistData;
  const createPlaylistResult = yield call(
    apiCall,
    action,
    createPlaylistApiPath,
    "POST",
    createPlaylistApiData
  );
  const playlistId = createPlaylistResult.id;

  // TODO: Extract to function
  if (playlistId) {
    const selectedTracksURIs = yield select(selectedTracksSelector);
    const addTracksApiPath = addTracksToPlaylistPath(playlistId);
    const addTracksApiData = addTracksToPlaylistData(selectedTracksURIs);
    const addTracksApiDataResult = yield call(
      apiCall,
      action,
      addTracksApiPath,
      "POST",
      addTracksApiData
    );

    // TODO: Extract to function
    if (addTracksApiDataResult.snapshot_id) {
      yield put(showToast(TOASTS.PLAYLIST_CREATED));
    }
  }
}

function* watchCreatePlaylistTask() {
  yield takeLatest(createPlaylist, createPlaylistTask);
}

export default function* tracks() {
  yield all([watchCreatePlaylistTask()]);
}

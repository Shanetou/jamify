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
import { MAX_SELECTABLE_SEEDS, TOASTS } from "../constants";

function* createPlaylistTask(action) {
  const user = yield select(userSelector);
  if (false) {
    yield put(showToast(TOASTS.MAX_SEEDS_SELECTED));
  } else {
    try {
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
      if (playlistId) {
        const selectedTracksURIs = yield select(selectedTracksSelector);
        const addTracksApiPath = addTracksToPlaylistPath(playlistId);
        const addTracksApiData = addTracksToPlaylistData(selectedTracksURIs);

        yield call(apiCall, action, addTracksApiPath, "POST", addTracksApiData);
      }
    } catch (error) {
      // handle error
    }
  }
}

function* watchCreatePlaylistTask() {
  yield takeLatest(createPlaylist, createPlaylistTask);
}

export default function* tracks() {
  yield all([watchCreatePlaylistTask()]);
}

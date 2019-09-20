import { all, call, takeLatest, select } from "redux-saga/effects";
import { createPlaylist } from "redux/actions";
import {
  addTracksToPlaylistData,
  addTracksToPlaylistPath,
  createPlaylistData,
  createPlaylistPath
} from "api/paths";
import apiCall from "./apiCall";
import { userSelector, selectedTracksSelector } from "../selectors";

function* createPlaylistTask(action) {
  // const { payload } = action;
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

function* watchCreatePlaylistTask() {
  yield takeLatest(createPlaylist, createPlaylistTask);
}

export default function* tracks() {
  yield all([watchCreatePlaylistTask()]);
}

import { all, fork, takeEvery, select } from "redux-saga/effects";
import { createPlaylist } from "redux/actions";
import { createPlaylistPath } from "api/paths";
import apiCall from "./apiCall";
import { userSelector } from "../selectors";

function* createPlaylistTask(action) {
  // const { payload } = action;
  const user = yield select(userSelector);

  const path = createPlaylistPath(user.id);
  const data = {
    name: "Shane's New Playlist",
    description: "New playlist description",
    public: false
  };

  // create playlist
  // then: dispatch action to add tracks

  const task = yield fork(apiCall, action, path, "POST", data);
  // console.log('task:', task);

  // console.log('task.toPromise():', task.toPromise());
  // task.toPromise().then(result => {
  // 	console.log('result from task:', result);
  // });
}

export default function* tracks() {
  yield all([takeEvery(createPlaylist, createPlaylistTask)]);
}

import { all } from "redux-saga/effects";
import artistsSaga from "./artists";
import errorHandlingSaga from "./errorHandling";
import playlistsSaga from "./playlists";
import recommendationsSaga from "./recommendations";
import startupSaga from "./startup";

export default function* root() {
  yield all([
    startupSaga(),
    errorHandlingSaga(),
    recommendationsSaga(),
    playlistsSaga(),
    artistsSaga()
  ]);
}

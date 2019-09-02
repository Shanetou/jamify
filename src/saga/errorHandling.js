import { all, fork, takeEvery, takeLatest, put } from "redux-saga/effects";
import { showErrorDialog } from "redux/actions";

import { getArtistsSearchPath } from "../api/paths";

import apiCall from "./apiCall";
import { DIALOGS } from "../constants";

export default function* errorHandlingSaga() {
  yield all([
    // Start a watcher to handle search workflow
    fork(watchErrorHandling)
  ]);
}

function* errorHandlingTask(action) {
  console.log("action in errorHandlingTask was called with action:", action);
  const { error } = action;

  const status = error.status;

  console.log("error.status:", error.status);
  if (error.status === 401) {
    console.log("error.status is 401: ", error.status);

    // fire action to show dialog
    yield put(
      showErrorDialog({ error, dialogType: DIALOGS.AUTHENTICATION_ERROR })
    );
  }

  // const path = recommendedTracksPath(payload);
  // const path = getArtistsSearchPath(payload);

  // yield fork(apiCall, action, path);
}

export function* watchErrorHandling() {
  const isErrorPattern = action => {
    console.log("action in watchErrorHandling:", action);
    const actionName = action.type;
    const apiErrorRegEx = /^API_(.*)_ERROR$/g;

    if (actionName.match(apiErrorRegEx)) {
      console.log("DOES MATCH:", actionName.match(apiErrorRegEx));
      return true;
    } else {
      console.log("DOES NOT!!!!!!!!!! MATCH:", actionName.match(apiErrorRegEx));
      return false;
    }
  };

  yield takeEvery(isErrorPattern, errorHandlingTask);
}

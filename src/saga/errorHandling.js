import { all, fork, takeLatest, put } from "redux-saga/effects";
import { showErrorDialog } from "redux/actions";

import { DIALOGS } from "../constants";

export default function* errorHandlingSaga() {
  yield all([fork(watchErrorHandling)]);
}

function* errorHandlingTask(action) {
  const { error } = action;
  if (error.status === 401) {
    yield put(showErrorDialog(DIALOGS.AUTHENTICATION_ERROR));
  } else {
    yield put(showErrorDialog(DIALOGS.GENERIC_ERROR));
  }
}

export function* watchErrorHandling() {
  const isErrorPattern = action => {
    const actionName = action.type;
    const apiErrorRegEx = /^API_(.*)_ERROR$/g;

    return actionName.match(apiErrorRegEx);
  };

  yield takeLatest(isErrorPattern, errorHandlingTask);
}

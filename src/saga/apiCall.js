import { call, put, select } from "redux-saga/effects";
import API from "../api/fetchFromSpotify";
import { accessTokenSelector } from "../selectors";

export const apiPhases = {
  STARTED: "STARTED",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  COMPLETED: "COMPLETED"
};

export const actionType = (action, phase) => `API_${action.type}_${phase}`;

const apiAction = (action, phase) => ({
  type: actionType(action, phase),
  payload: action.payload
});

const startedAction = action => apiAction(action, apiPhases.STARTED);

const successAction = (action, response) => ({
  ...apiAction(action, apiPhases.SUCCESS),
  response
});

const errorAction = (action, response) => ({
  ...apiAction(action, apiPhases.ERROR),
  error: response.error
});

const completedAction = action => apiAction(action, apiPhases.COMPLETED);

function* apiCall(action, urlPart, requestType = "GET", data) {
  const accessToken = yield select(accessTokenSelector);

  try {
    yield put(startedAction(action));

    let result;
    if (requestType === "GET") {
      result = yield call(API.get, accessToken, urlPart);
    } else if (requestType === "POST") {
      result = yield call(API.post, accessToken, urlPart, data);
    }

    yield put(successAction(action, result));

    return result;
  } catch (error) {
    // Propogate error to error handling by calling api error action
    yield put(errorAction(action, error));
    return error;
  } finally {
    yield put(completedAction(action));
  }
}

export default apiCall;

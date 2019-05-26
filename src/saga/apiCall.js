import { put, call, select } from 'redux-saga/effects';
// import { asyncFetchFromSpotify } from 'api/fetchFromSpotify'
import API from 'api/fetchFromSpotify';
import { accessTokenSelector } from 'selectors';

export const apiPhases = {
  STARTED: 'STARTED',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  COMPLETED: 'COMPLETED'
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

const errorAction = (action, error) => ({
  ...apiAction(action, apiPhases.ERROR),
  errors: [error.message]
});

const completedAction = action => apiAction(action, apiPhases.COMPLETED);

export const apiCall = function*(action, urlPart, requestType = 'GET') {
  console.log('action:', action);
  const accessToken = yield select(accessTokenSelector);

  if (!accessToken) {
    console.log('NO TOKEN IN API CALL:', action.type);
    return; // Handle 401 here
  }

  try {
    yield put(startedAction(action));

    let result;
    if (requestType === 'GET') {
      result = yield call(API.get, accessToken, urlPart);
    } else if (requestType === 'POST') {
      result = yield call(API.post, accessToken, urlPart, action.payload.data);
    }

    yield put(successAction(action, result));
  } catch (error) {
    yield put(errorAction(action, error));
  } finally {
    yield put(completedAction(action));
  }
};

export default apiCall;

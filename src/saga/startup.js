import { all, call, fork, put, select, take } from 'redux-saga/effects';
import { fetchUser, saveAccessToken } from 'redux/actions';
import { accessTokenSelector } from 'selectors';
import apiCall from './apiCall';

export function* getAccessToken() {
  const accessToken = new URLSearchParams(window.location.search).get('access_token')

  if (accessToken) {
    yield put(saveAccessToken(accessToken))
  }
}

export function* fetchUserTask() {
  yield put(fetchUser())
}

export function* watchSaveAccessToken() {
  while (true) {
    yield take(saveAccessToken)

    const accessToken = yield select(accessTokenSelector)

    yield call(fetchUserTask, accessToken)
  }
}

export function* watchFetchUser() {
  while (true) {
    const action = yield take(fetchUser)

    yield fork(apiCall, action, 'me')
  }
}

// TODO: FETCH TOP ARTISTS AT THE SAME TIME
// AS FETCHING USER

export default function* startup() {
  yield all([
    watchFetchUser(),
    watchSaveAccessToken(),
    getAccessToken(),
  ])
}

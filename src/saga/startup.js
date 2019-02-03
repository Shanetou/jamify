import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { fetchUser, fetchTopArtists, saveAccessToken } from 'redux/actions';
import { accessTokenSelector } from 'selectors';
import apiCall from './apiCall';
import { TOP_ARTISTS_PATH } from 'api/paths'

export function* getStartupData(accessToken) {
  yield fork(fetchUserTask, accessToken)
  yield fork(fetchTopArtistsTask, accessToken)
} 

export function* getAccessToken() {
  const accessToken = new URLSearchParams(window.location.search).get('access_token')

  if (accessToken) {
    yield put(saveAccessToken(accessToken))
    yield call(getStartupData, accessToken)
  }
}

export function* watchFetchUser() {
  while (true) {
    const action = yield take(fetchUser)
    
    yield fork(apiCall, action, 'me')
  }
}

export function* fetchUserTask() {
  yield put(fetchUser())
}

export function* watchFetchTopArtists() {
  while (true) {
    const action = yield take(fetchTopArtists)
    
    yield fork(apiCall, action, TOP_ARTISTS_PATH)
  }
}

export function* fetchTopArtistsTask() {
  yield put(fetchTopArtists())
}

export default function* startup() {
  yield all([
    watchFetchUser(),
    watchFetchTopArtists(),
    getAccessToken(),
  ])
}

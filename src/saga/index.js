import { all, take, takeEvery, put, call, fork, select } from 'redux-saga/effects'
import { saveAccessToken, fetchUser } from 'redux/actions'
import { accessTokenSelector } from 'selectors'

import { asyncFetchFromSpotify } from 'fetchFromSpotify'

import apiCall from './apiCall'
console.log('fetchUser:', fetchUser)

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// import fetch from 'isomorphic-fetch'
// import * as actions from '../actions'
// import { selectedRedditSelector, postsByRedditSelector } from '../reducers/selectors'

// export function fetchPostsApi(reddit) {
//   return fetch(`https://www.reddit.com/r/${reddit}.json`)
//     .then(response => response.json())
//     .then(json => json.data.children.map(child => child.data))
// }

// export function* fetchPosts(reddit) {
//   yield put(actions.requestPosts(reddit))
//   const posts = yield call(fetchPostsApi, reddit)
//   yield put(actions.receivePosts(reddit, posts))
// }

// export function* invalidateReddit() {
//   while (true) {
//     const { reddit } = yield take(actions.INVALIDATE_REDDIT)
//     yield call(fetchPosts, reddit)
//   }
// }

// export function* nextRedditChange() {
//   while (true) {
//     const prevReddit = yield select(selectedRedditSelector)
//     yield take(actions.SELECT_REDDIT)

//     const newReddit = yield select(selectedRedditSelector)
//     const postsByReddit = yield select(postsByRedditSelector)
//     if (prevReddit !== newReddit && !postsByReddit[newReddit]) yield fork(fetchPosts, newReddit)
//   }
// }

// export function* startup() {
//   console.log('bam bam bam saga is bam starting!')

//   const selectedReddit = yield select(selectedRedditSelector)
//   yield fork(fetchPosts, selectedReddit)
// }

// export function* testSelectTempo() {
//   console.log('this is selecting the tempo!')

//   const selectedReddit = yield select(selectedRedditSelector)
//   yield fork(fetchPosts, selectedReddit)
// }

// export function* selectTempo() {
//   yield delay(1000)
//   yield put({ type: 'SELECT_ARTIST', payload: 1 })
// }

// export function* watchSelectTempo() {
//   yield takeEvery('SELECT_TEMPO', selectTempo)
// }

export function* getAccessToken() {
  const accessToken = new URLSearchParams(window.location.search).get('access_token')

  if (accessToken) {
    yield put(saveAccessToken(accessToken))
  }
}

export function* fetchUserTask(accessToken) {
  console.log('accessToken in fetchUser:', accessToken)

  console.log('fetchUser():', fetchUser())
  yield put(fetchUser())

  // try {
  //   console.log('asyncFetchFromSpotify:', asyncFetchFromSpotify)
  //   const data = yield call(
  //     asyncFetchFromSpotify, 
  //     accessToken, 
  //     'me', 
  //   )

  //   console.log('data:', data)
  //   yield put({
  //     type: 'FETCH_USER_SUCCESS',
  //     payload: data,
  //   })
  //   } catch (error) {
  //   console.log('error:', error)
  // }
}

export function* watchSaveAccessToken() {
  const accessToken = yield select(accessTokenSelector)
  console.log('watchSaveAccessToken:')

  console.log('fetchUserTask:', fetchUserTask)
  yield call(fetchUserTask, accessToken)
}

export function* watchFetchUser() {
  while (true) {
    console.log('watchFetchUser:')
    console.log('fetchUser:', fetchUser)
    const action = yield take(fetchUser)
    console.log('action watchFetchUser:', action)

    yield fork(apiCall, action, 'me')
  }
}


export default function* root() {
  yield all([
    watchFetchUser(),
    getAccessToken(),
    watchSaveAccessToken(),
  ])
  // yield fork(startup)
  // yield fork(nextRedditChange)
  // yield fork(invalidateReddit)
}

// function* watcher() {
//   while (true) {
//     const action = yield take(ACTION)
//     yield fork(worker, action.payload)
//   }
// }

// function* worker(payload) {
//   // ... do some stuff
// }


// For auth/token saga: https://gist.github.com/dispix/5a9c990bd6eea4b7f9a93fe93722baa8


/* EXAMPE sagas.js */

// import { call, take, put } from 'redux-saga/effects';

// // The asterisk behind the function keyword tells us that this is a generator.
// function* fetchData() {
//     // The yield keyword means that we'll wait until the (asynchronous) function
//     // after it completes.
//     // In this case, we wait until the FETCH_DATA action happens.
//     yield take(FETCH_DATA);
//     // We then fetch the data from the server, again waiting for it with yield
//     // before continuing.
//     var data = yield call(fetch, 'https://someurl.com/someendpoint');
//     // When the data has finished loading, we dispatch the dataLoaded action.
//     put(dataLoaded(data));
// }
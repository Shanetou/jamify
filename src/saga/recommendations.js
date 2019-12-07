import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import {
  selectRecommendationSeed,
  fetchTracks,
  deselectAttribute,
  selectAttribute,
  setAttributeValue,
  showToast
} from "redux/actions";
import { tracksPath } from "api/paths";
import apiCall from "./apiCall";
import { attributesSelector, recommendationSeedsSelector } from "../selectors";
import { MAX_SELECTABLE_SEEDS, TOASTS } from "../constants";

function* fetchTracksTask(action) {
  const recommendationSeeds = yield select(recommendationSeedsSelector);
  const attributes = yield select(attributesSelector);
  const path = tracksPath(recommendationSeeds, attributes);

  yield fork(apiCall, action, path);
}

export function* watchFetchTracks() {
  yield takeEvery(fetchTracks, fetchTracksTask);
}

function* selectRecommendationSeedTask(_action) {
  const recommendationSeeds = yield select(recommendationSeedsSelector);
  const selectedSeedsCount = recommendationSeeds.length;

  if (selectedSeedsCount >= MAX_SELECTABLE_SEEDS) {
    yield put(showToast(TOASTS.MAX_SEEDS_SELECTED));
  } else if (selectedSeedsCount > 0) {
    yield put(fetchTracks());
  }
}

export function* watchSelectRecommendationSeed() {
  yield takeEvery(selectRecommendationSeed, selectRecommendationSeedTask);
}

function* updateRecommendationAttributesTask(action) {
  const recommendationSeeds = yield select(recommendationSeedsSelector);

  if (recommendationSeeds.length > 0) {
    yield put(fetchTracks());
  }
}

export function* watchUpdateRecommendationAttributes() {
  yield takeEvery(
    [deselectAttribute, selectAttribute, setAttributeValue],
    updateRecommendationAttributesTask
  );
}

export default function* recommendations() {
  yield all([
    watchFetchTracks(),
    watchSelectRecommendationSeed(),
    watchUpdateRecommendationAttributes()
  ]);
}

// export function* incrementAsync() {
//   yield delay(1000)
//   yield put({ type: 'INCREMENT' })
// }

// export function* watchIncrementAsync() {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }

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

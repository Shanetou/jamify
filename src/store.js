// import { applyMiddleware, compose, createStore } from 'redux'
// import { createLogger } from 'redux-logger'

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// // import loggerMiddleware from './middleware/logger'

// export default function configureStore(preloadedState) {
//   const sagaMiddleware = createSagaMiddleware()
//   const loggerMiddleware = createLogger()

//   const middleware = [
//     sagaMiddleware,
//     // loggerMiddleware, 
//   ]
//   const middlewareEnhancer = applyMiddleware(...middleware)

//   // const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   // const composedEnhancers = compose(...enhancers)

//   const store = createStore(rootReducer, preloadedState, middlewareEnhancer)

//   return store
// }

import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import createSagaMiddleware from 'redux-saga'
import sagas from './saga'
// import logger from 'redux-logger'

import { default as reducer } from './redux/reducers'

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  ...getDefaultMiddleware(), 
  sagaMiddleware,
  // logger,
]

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
})

// TODO: DOES THIS WORK? 
// then run the saga
sagaMiddleware.run(sagas)
//

export default store
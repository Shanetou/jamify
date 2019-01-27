import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import createSagaMiddleware from 'redux-saga'
import sagas from './saga'

import reducer from 'redux/reducers'

const sagaMiddleware = createSagaMiddleware(
  // add onError to handle uncaught exceptions
)

const middleware = [
  ...getDefaultMiddleware(), 
  sagaMiddleware,
]

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
})

sagaMiddleware.run(sagas)

export default store
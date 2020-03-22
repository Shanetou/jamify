import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import createSagaMiddleware from "redux-saga";
import reducer from "redux/reducers";
import sagas from "./saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware(), sagaMiddleware];

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production"
});

sagaMiddleware.run(sagas);

export default store;

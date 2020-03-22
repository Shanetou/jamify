import { createReducer } from "redux-starter-kit";
import {
  hideErrorDialog,
  hideToast,
  selectCategory,
  showErrorDialog,
  showToast
} from "redux/actions";
import { CATEGORIES } from "../../constants";

const initialState = {
  category: CATEGORIES.FAV_ARTISTS,
  dialog: null,
  toast: null
};

const uiReducer = createReducer(initialState, {
  [hideErrorDialog]: (state, _action) => ({
    ...state,
    dialog: null
  }),
  [hideToast]: (state, _action) => ({
    ...state,
    toast: null
  }),
  [selectCategory]: (state, action) => ({
    ...state,
    category: action.payload
  }),
  [showErrorDialog]: (state, action) => ({
    ...state,
    dialog: action.payload
  }),
  [showToast]: (state, action) => ({
    ...state,
    toast: action.payload
  })
});

export default uiReducer;

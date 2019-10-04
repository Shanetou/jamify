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
  [selectCategory]: (state, action) => {
    return {
      ...state,
      category: action.payload
    };
  },
  [showErrorDialog]: (state, action) => {
    return {
      ...state,
      dialog: action.payload
    };
  },
  [hideErrorDialog]: (state, _action) => {
    return {
      ...state,
      dialog: null
    };
  },
  [showToast]: (state, action) => {
    return {
      ...state,
      toast: action.payload
    };
  },
  [hideToast]: (state, _action) => {
    return {
      ...state,
      toast: null
    };
  }
});

export default uiReducer;

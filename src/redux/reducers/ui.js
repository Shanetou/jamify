import { createReducer } from "redux-starter-kit";
import {
  hideErrorDialog,
  hideToast,
  selectCategory,
  showErrorDialog,
  showToast
} from "redux/actions";

import { CATEGORIES, DIALOGS } from "../../constants";

const initialState = {
  category: CATEGORIES.ARTIST,
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
  [hideErrorDialog]: (state, action) => {
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
  [hideToast]: (state, action) => {
    return {
      ...state,
      toast: null
    };
  }
});

export default uiReducer;

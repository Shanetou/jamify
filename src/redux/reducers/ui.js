import { createReducer } from "redux-starter-kit";
import {
  hideErrorDialog,
  selectCategory,
  showErrorDialog
} from "redux/actions";

import { CATEGORIES, DIALOGS } from "../../constants";

const initialState = {
  category: CATEGORIES.ARTIST,
  dialog: null
};

const uiReducer = createReducer(initialState, {
  [selectCategory]: (state, action) => {
    return {
      ...state,
      category: action.payload
    };
  },
  [showErrorDialog]: (state, action) => {
    console.log("UI SHOW ERROR DIALOG state:", state);
    console.log("UI SHOW ERROR DIALOG action:", action);
    return {
      ...state,
      dialog: action.payload
    };
  },
  [hideErrorDialog]: (state, action) => {
    console.log("UI HIDE ERROR DIALOG state:", state);
    console.log("UI HIDE ERROR DIALOG action:", action);
    return {
      ...state,
      dialog: null
    };
  }
});

export default uiReducer;

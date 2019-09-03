import { createAction } from "redux-starter-kit";

export const selectCategory = createAction("SELECT_CATEGORY");
export const showErrorDialog = createAction("SHOW_ERROR_DIALOG");
export const hideErrorDialog = createAction("HIDE_ERROR_DIALOG");

export const showToast = createAction("SHOW_TOAST");
export const hideToast = createAction("HIDE_TOAST");

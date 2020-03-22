import { createAction } from "redux-starter-kit";

export const hideErrorDialog = createAction("HIDE_ERROR_DIALOG");
export const selectCategory = createAction("SELECT_CATEGORY");
export const showErrorDialog = createAction("SHOW_ERROR_DIALOG");

export const hideToast = createAction("HIDE_TOAST");
export const showToast = createAction("SHOW_TOAST");

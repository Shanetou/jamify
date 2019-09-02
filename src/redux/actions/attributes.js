import { createAction } from "redux-starter-kit";

export const deselectAttribute = createAction("DESELECT_ATTRIBUTE");
export const selectAttribute = createAction("SELECT_AND_SET_ATTRIBUTE_VALUE");
export const setAttributeValue = createAction("SET_ATTRIBUTE_VALUE");

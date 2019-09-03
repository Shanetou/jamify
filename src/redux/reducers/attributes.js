import { createReducer } from "redux-starter-kit";
import { TRACK_ATTRIBUTES } from "../../constants";

import {
  deselectAttribute,
  selectAttribute,
  setAttributeValue
} from "redux/actions";

const initialState = {
  attributes: TRACK_ATTRIBUTES
};

const attributesReducer = createReducer(initialState, {
  [selectAttribute]: (state, action) => {
    const {
      payload: { attribute, value }
    } = action;
    const updatedAttribute = {
      ...attribute,
      isSelected: true,
      value
    };

    return {
      ...state,
      attributes: {
        ...state.attributes,
        [attribute.name]: updatedAttribute
      }
    };
  },
  [deselectAttribute]: (state, action) => {
    const {
      payload: { attribute }
    } = action;
    const updatedAttribute = {
      ...attribute,
      isSelected: false,
      value: null
    };

    return {
      ...state,
      attributes: {
        ...state.attributes,
        [attribute.name]: updatedAttribute
      }
    };
  },
  [setAttributeValue]: (state, action) => {
    const {
      payload: { attribute, value }
    } = action;
    const updatedAttribute = {
      ...attribute,
      value
    };

    return {
      ...state,
      attributes: {
        ...state.attributes,
        [attribute.name]: updatedAttribute
      }
    };
  }
});

export default attributesReducer;

import { createReducer } from "redux-starter-kit";
import {
  deselectAttribute,
  selectAttribute,
  setAttributeValue
} from "redux/actions";
import { TRACK_ATTRIBUTES } from "../../constants";

const initialState = {
  attributes: TRACK_ATTRIBUTES
};

const attributesReducer = createReducer(initialState, {
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

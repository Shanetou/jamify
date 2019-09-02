import { createReducer } from "redux-starter-kit";
import { TRACK_ATTRIBUTES } from "../../constants";

import { toggleAttribute, setAttributeValue } from "redux/actions";

const initialState = {
  attributes: TRACK_ATTRIBUTES
};

const toggledAttribute = attribute => {
  const isAlreadySelected = attribute.isSelected;

  if (isAlreadySelected) {
    return {
      ...attribute,
      isSelected: false
    };
  } else {
    return {
      ...attribute,
      isSelected: true
    };
  }
};

const attributesReducer = createReducer(initialState, {
  [setAttributeValue]: (state, action) => {
    const attribute = action.payload.attribute;
    const newValue = action.payload.newValue;

    return {
      ...state,
      attributes: {
        ...state.attributes,
        [attribute.name]: {
          ...attribute,
          value: newValue
        }
      }
    };
  },
  [toggleAttribute]: (state, action) => {
    const targetAttribute = action.payload;

    return {
      ...state,
      attributes: {
        ...state.attributes,
        [targetAttribute.name]: toggledAttribute(targetAttribute)
      }
    };
  }
});

export default attributesReducer;

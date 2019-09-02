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

// const toggledAttribute = attribute => {
// 	const isAlreadySelected = attribute.isSelected;

// 	if (isAlreadySelected) {
// 		return {
// 			...attribute,
// 			isSelected: false,
// 		};
// 	} else {
// 		return {
// 			...attribute,
// 			isSelected: true,
// 		};
// 	}
// };

// const updatedValueAttribute = (attribute, newValue) => {
// 	const isAlreadySelected = attribute.isSelected;

// 	if (isAlreadySelected) {
// 		return {
// 			...attribute,
// 			value: null,
// 		};
// 	} else {
// 		return {
// 			...attribute,
// 			value: newValue,
// 		};
// 	}
// };

// const attributesReducer = createReducer(initialState, {
// 	[setAttributeValue]: (state, action) => {
// 		const attribute = action.payload.attribute;
// 		const newValue = action.payload.newValue;
// 		console.log('newValue:', newValue);

// 		return {
// 			...state,
// 			attributes: {
// 				...state.attributes,
// 				[attribute.name]: updatedValueAttribute(attribute, newValue),
// 			},
// 		};
// 	},
// 	[toggleAttribute]: (state, action) => {
// 		const attribute = action.payload;

// 		return {
// 			...state,
// 			attributes: {
// 				...state.attributes,
// 				[attribute.name]: toggledAttribute(attribute),
// 			},
// 		};
// 	},
// });

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

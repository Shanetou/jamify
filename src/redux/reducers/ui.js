import { createReducer } from 'redux-starter-kit';

import { selectCategory } from 'redux/actions';

import { CATEGORIES } from '../../constants';

const initialState = {
  category: CATEGORIES.ARTIST
};

const uiReducer = createReducer(initialState, {
  [selectCategory]: (state, action) => {
    return {
      ...state,
      category: action.payload
    };
  }
});

export default uiReducer;

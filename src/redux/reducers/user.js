import { createReducer } from 'redux-starter-kit';

const initialState = {
  accessToken: null,
  user: null
};

const userReducer = createReducer(initialState, {
  SAVE_ACCESS_TOKEN: (state, action) => {
    return {
      ...state,
      accessToken: action.payload
    };
  },
  API_FETCH_USER_SUCCESS: (state, action) => {
    return {
      ...state,
      user: action.response
    };
  }
});

export default userReducer;

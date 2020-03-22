import { createReducer } from "redux-starter-kit";
import { saveAccessToken } from "redux/actions";

const initialState = {
  accessToken: null,
  user: null
};

const userReducer = createReducer(initialState, {
  [saveAccessToken]: (state, action) => ({
    ...state,
    accessToken: action.payload
  }),
  API_FETCH_USER_SUCCESS: (state, action) => ({
    ...state,
    user: action.response
  })
});

export default userReducer;

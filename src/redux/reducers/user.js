import { createReducer } from 'redux-starter-kit'

import { saveAccessToken } from 'redux/actions'

const initialState = {
  accessToken: null,
  user: null,
}

const userReducer = createReducer(initialState, {
  [saveAccessToken]: (state, action) => {
    return {
      ...state,
      accessToken: action.payload
    }
  },
  'API_FETCH_USER_SUCCESS': (state, action) => {
    return {
      ...state, 
      user: action.payload,
    }
  },
})

export default userReducer

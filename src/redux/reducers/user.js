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
    console.log('API_FETCH_USER_SUCCESS action:', action)
    console.log('API_FETCH_USER_SUCCESS state:', state)
    return {
      ...state, 
      user: action.response,
    }
  },
})

export default userReducer

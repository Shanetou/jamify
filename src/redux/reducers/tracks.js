import { createReducer } from 'redux-starter-kit'

import { saveAccessToken } from 'redux/actions'

const initialState = {
  recommendedTracks: [],
}

const userReducer = createReducer(initialState, {
  'FETCH_RECOMMENDED_TRACKS': (state, action) => {
    console.log('action:', action)
    console.log('state:', state)
    return {
      ...state, 
      // user: action.response,
    }
  },
  'API_FETCH_RECOMMENDED_TRACKS_SUCCESS': (state, action) => {
    return {
      ...state, 
      recommendedTracks: action.response.tracks,
    }
  },
})

export default userReducer

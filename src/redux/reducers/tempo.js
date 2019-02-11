import { createReducer } from 'redux-starter-kit'

import { selectTempo } from 'redux/actions'

import { TEMPO_OPTIONS } from '../../constants'

const initialState = {
  tempoOptions: TEMPO_OPTIONS,
  selected: 3,
}

const tempoReducer = createReducer(initialState, {
  [selectTempo]: (state, action) => {
    return {
      ...state,
      selected: action.payload
    }
  }
})

export default tempoReducer
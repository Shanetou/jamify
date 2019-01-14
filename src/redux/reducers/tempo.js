import { createReducer } from 'redux-starter-kit'

import { selectTempo } from '../actions'

import { TEMPO_OPTIONS } from '../../constants'

const initialState = {
  tempoOptions: TEMPO_OPTIONS,
}

const tempoReducer = createReducer(initialState, {
  [selectTempo]: (state, action) => {
    console.log('I AM SHANE', action);
    console.log('initialState', initialState);
    console.log('action', action);
    console.log('state', state);
    return {
      selected: action.payload
    }
  }
})

export default tempoReducer
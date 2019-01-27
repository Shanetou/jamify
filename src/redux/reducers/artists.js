import { createReducer } from 'redux-starter-kit'

import { selectArtist } from 'redux/actions'

import { MAX_SELECTABLE_ARTISTS } from '../../constants'
console.log('selectArtist:', selectArtist)

const addOrRemoveArtist = (prevSelected, id) => {
  const selectedIdx = prevSelected.indexOf(id)
  
  if (selectedIdx > -1) {
    return prevSelected.filter((_, i) => i !== selectedIdx)
  }
  
  if (prevSelected.length < MAX_SELECTABLE_ARTISTS){
    return [...prevSelected, id]
  }
  
  return prevSelected 
}


const initialState = {
  artists: [],
  selected: [],
}

const artistReducer = createReducer(initialState, {
  [selectArtist]: (state, action) => {
    const { selected } = state
    const { payload } = action

    return {
      ...state,
      selected: addOrRemoveArtist(selected, payload)
    }
  }
})

export default artistReducer

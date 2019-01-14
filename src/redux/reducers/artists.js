// // import { combineReducers } from 'redux'
// import { createReducer } from 'redux-starter-kit'

// import { selectArtist } from '../actions'

// import { TEMPO_OPTIONS } from './constants'
 
// // export default function generalReducer(state, action) {
// //   return state
// // }

// // export default combineReducers({
// //   generalReducer
// // })

// // const tempoOptions = tempos.map(tempo => ({
// //   ...tempo,
// //   selected: false,
// // }))

// const initialState = {
//   tempoOptions: TEMPO_OPTIONS,
// }

// const tempoReducer = createReducer(initialState, {
//   [selectArtist]: (state, action) => {
//     console.log('action', action);
//     console.log('state', state);
//     return {
//       selected: action.payload
//     }
//   }
// })

// export default tempoReducer
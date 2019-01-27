import { actionType, apiPhases } from 'saga/apiCall'

// export const actionType = (entity, phase) => (
//   `API_FETCH_${entity}_${phase}`
// )

// export const createApiReducer = (entity, stateKey) => {
//   console.log('entity:', entity)
//   console.log('stateKey:', stateKey)
//   return {
//     [`API_FETCH_${entity}_SUCCESS`]: (state, action) => {
//       return {
//         ...state, 
//         [stateKey]: action.response,
//       }
//     },
//     [`API_FETCH_${entity}_ERROR`]: (state, action) => {
//       return {
//         ...state,
//       }
//     },
//   }
// }
import { actionType, apiPhases } from 'saga/apiCall';
import { MAX_SELECTABLE_SEEDS, SEED_TYPES } from '../../constants';

export const isArtistSeed = seed => seed.seedType === SEED_TYPES.artist;
export const isGenreSeed = seed => seed.seedType === SEED_TYPES.genre;

// export const addRecommendationSeed = (seedId, currentSeeds) => {
//   console.log("currentSeeds:", currentSeeds);
//   if (currentSeeds.length > MAX_SELECTABLE_SEEDS) {
//     console.error("Current seeds maxed out: ", currentSeeds);
//     // Throw error here
//   } else {
//     return [...currentSeeds, seedId];
//   }
// };

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

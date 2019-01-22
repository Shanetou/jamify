import tempoReducer from './tempo'
import artistReducer from './artists'

const rootReducer = {
  artists: artistReducer,
  tempos: tempoReducer,
}

export default rootReducer
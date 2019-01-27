import tempoReducer from './tempo'
import artistReducer from './artists'
import userReducer from './user'

const rootReducer = {
  artists: artistReducer,
  tempos: tempoReducer,
  user: userReducer,
}

export default rootReducer
import temposReducer from './tempo'
import artistsReducer from './artists'
import tracksReducer from './tracks'
import userReducer from './user'

const rootReducer = {
  artists: artistsReducer,
  tempos: temposReducer,
  tracks: tracksReducer,
  user: userReducer,
}

export default rootReducer
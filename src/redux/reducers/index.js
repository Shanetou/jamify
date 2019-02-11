import artistsReducer from './artists'
import playlistsReducer from './playlists'
import temposReducer from './tempo'
import tracksReducer from './tracks'
import userReducer from './user'

const rootReducer = {
  artists: artistsReducer,
  playlists: playlistsReducer,
  tempos: temposReducer,
  tracks: tracksReducer,
  user: userReducer,
}

export default rootReducer
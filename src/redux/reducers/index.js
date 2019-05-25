import artistsReducer from './artists';
import playlistsReducer from './playlists';
import temposReducer from './tempo';
import tracksReducer from './tracks';
import genresReducer from './genres';
import userReducer from './user';

const rootReducer = {
  artists: artistsReducer,
  genres: genresReducer,
  playlists: playlistsReducer,
  tempos: temposReducer,
  tracks: tracksReducer,
  user: userReducer
};

export default rootReducer;

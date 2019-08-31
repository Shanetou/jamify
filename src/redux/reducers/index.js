import artistsReducer from "./artists";
import playlistsReducer from "./playlists";
import recommendationsReducer from "./recommendations";
import genresReducer from "./genres";
import userReducer from "./user";
import uiReducer from "./ui";

const rootReducer = {
  artists: artistsReducer,
  genres: genresReducer,
  playlists: playlistsReducer,
  recommendations: recommendationsReducer,
  user: userReducer,
  ui: uiReducer
};

export default rootReducer;

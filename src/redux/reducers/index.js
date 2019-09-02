import artistsReducer from "./artists";
import attributesReducer from "./attributes";
import playlistsReducer from "./playlists";
import recommendationsReducer from "./recommendations";
import genresReducer from "./genres";
import userReducer from "./user";
import uiReducer from "./ui";

const rootReducer = {
  artists: artistsReducer,
  attributes: attributesReducer,
  genres: genresReducer,
  playlists: playlistsReducer,
  recommendations: recommendationsReducer,
  user: userReducer,
  ui: uiReducer
};

export default rootReducer;

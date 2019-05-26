export const USER = 'me';
export const BASE_SPOTIFY_URL = 'https://api.spotify.com/v1/';
// export const GENERIC_SEARCH_PATH = "search";
export const TOP_ARTISTS_PATH = 'me/top/artists?limit=12';
// BEWARE: You changed the name of this var
export const RECOMMENDATIONS_PATH = 'recommendations';

export const getArtistsSearchPath = queryString => {
  console.log('getArtistsSearchPath queryString:', queryString);
  // "https://api.spotify.com/v1/search?query=tania+bowra\u0026offset=0\u0026limit=20\u0026type=artist"
  const limit = 5;

  return `search/?query=${queryString}\u0026type=artist\u0026limit=${limit}`;
};

export const RECOMMENDATION_GENRES_PATH = `${RECOMMENDATIONS_PATH}/available-genre-seeds`;

export const getRecommendedTracksPath = queryString =>
  `${RECOMMENDATIONS_PATH}?${queryString}`;

export const createPlaylistPath = ({ userId }) => `users/${userId}/playlists`;

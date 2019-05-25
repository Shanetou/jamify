export const USER = 'me';
export const TOP_ARTISTS_PATH = 'me/top/artists?limit=12';
// BEWARE: You changed the name of this var
export const RECOMMENDATIONS_PATH = 'recommendations';

export const RECOMMENDATION_GENRES_PATH = `${RECOMMENDATIONS_PATH}/available-genre-seeds`;

export const getRecommendedTracksPath = queryString =>
  `${RECOMMENDATIONS_PATH}?${queryString}`;

export const createPlaylistPath = ({ userId }) => `users/${userId}/playlists`;

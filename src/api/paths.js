import { default as queryStringHelper } from 'query-string';
import { isArtistSeed, isGenreSeed } from '../redux/reducers/helpers';

export const USER = 'me';
export const BASE_SPOTIFY_URL = 'https://api.spotify.com/v1/';
// export const GENERIC_SEARCH_PATH = "search";
export const TOP_ARTISTS_PATH = 'me/top/artists?limit=12';
// BEWARE: You changed the name of this var
export const RECOMMENDATIONS_PATH = 'recommendations';

export const getArtistsSearchPath = queryString => {
  // "https://api.spotify.com/v1/search?query=tania+bowra\u0026offset=0\u0026limit=20\u0026type=artist"
  const limit = 5;

  return `search/?query=${queryString}\u0026type=artist\u0026limit=${limit}`;
};

export const RECOMMENDATION_GENRES_PATH = `${RECOMMENDATIONS_PATH}/available-genre-seeds`;

// ("https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK%2C4NHQUGzhtTLFvgF5SZesLK&seed_genres=acoustic%2Cclassical&min_energy=0.4&min_popularity=50");

export const getRecommendedTracksPath = recommendationSeeds => {
  const initialQueryParameters = {
    market: 'US',
    seed_artists: [],
    seed_genres: []
  };

  const addOrRemoveSeed = (prev, curr) => {
    if (isArtistSeed(curr)) {
      return {
        ...prev,
        seed_artists: [...prev.seed_artists, curr.id]
      };
    } else if (isGenreSeed(curr)) {
      return {
        ...prev,
        seed_genres: [...prev.seed_genres, curr.id]
      };
    } else {
      throw new Error('Recommendation seed of unknown type');
    }
  };

  const queryParameters = recommendationSeeds.reduce(
    addOrRemoveSeed,
    initialQueryParameters
  );

  const queryString = queryStringHelper.stringify(queryParameters, {
    arrayFormat: 'comma'
  });

  return `${RECOMMENDATIONS_PATH}?${queryString}`;
};

export const createPlaylistPath = ({ userId }) => `users/${userId}/playlists`;

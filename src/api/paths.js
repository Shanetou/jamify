import queryStringHelper from "query-string";
import { isArtistSeed, isGenreSeed } from "../redux/reducers/helpers";

export const LOGIN = process.env.REACT_APP_AUTH_URI;
export const USER = "me";
export const BASE_SPOTIFY_URL = "https://api.spotify.com/v1/";
export const TOP_ARTISTS_PATH = "me/top/artists?limit=25";
export const RECOMMENDATIONS_PATH = "recommendations";
export const RECOMMENDATION_GENRES_PATH = `${RECOMMENDATIONS_PATH}/available-genre-seeds`;
const ARTIST_SEARCH_RESULTS_LIMIT = 6;

export const getArtistsSearchPath = queryString =>
  `search/?query=${queryString}\u0026type=artist\u0026limit=${ARTIST_SEARCH_RESULTS_LIMIT}`;

const targetAttributeQueryArgs = attributes => {
  const selectedAttributes = Object.values(attributes).filter(
    attribute => attribute.isSelected === true
  );
  const packagedQueryParams = selectedAttributes.reduce((prev, curr) => {
    const attributeName = curr.name.toLowerCase();
    const attributeParamKey = `target_${attributeName}`;
    const { value } = curr;

    return {
      ...prev,
      [attributeParamKey]: value
    };
  }, {});

  return packagedQueryParams;
};

const recommendationSeedQueryArgs = recommendationSeeds => {
  const queryArgs = { seed_artists: [], seed_genres: [] };
  const packagedQueryParams = (prev, curr) => {
    if (isArtistSeed(curr)) {
      return {
        ...prev,
        seed_artists: [...prev.seed_artists, curr.id]
      };
    }
    if (isGenreSeed(curr)) {
      return {
        ...prev,
        seed_genres: [...prev.seed_genres, curr.id]
      };
    }
    throw new Error("Recommendation seed of unknown type");
  };

  return recommendationSeeds.reduce(packagedQueryParams, queryArgs);
};

export const tracksPath = (
  recommendationSeeds,
  attributes,
  basePath = RECOMMENDATIONS_PATH
) => {
  const baseQueryArgs = { market: "US" };
  const queryArgs = {
    ...baseQueryArgs,
    ...recommendationSeedQueryArgs(recommendationSeeds),
    ...targetAttributeQueryArgs(attributes)
  };

  const queryString = queryStringHelper.stringify(queryArgs, {
    arrayFormat: "comma"
  });

  return `${basePath}?${queryString}`;
};

export const createPlaylistPath = userId => `users/${userId}/playlists`;
export const createPlaylistData = dateNow => ({
  name: `Jayce Is Phat! - ${dateNow.toDateString()}`,
  description: "New playlist description",
  public: false
});

export const addTracksToPlaylistPath = playlistId =>
  `playlists/${playlistId}/tracks`;
export const addTracksToPlaylistData = trackURIs => ({
  uris: trackURIs
});

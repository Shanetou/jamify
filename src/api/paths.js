import { default as queryStringHelper } from "query-string";
import { isArtistSeed, isGenreSeed } from "../redux/reducers/helpers";

export const LOGIN = process.env.REACT_APP_AUTH_URI;

export const USER = "me";
export const BASE_SPOTIFY_URL = "https://api.spotify.com/v1/";
export const TOP_ARTISTS_PATH = "me/top/artists?limit=25";
// BEWARE: You changed the name of this var
export const RECOMMENDATIONS_PATH = "recommendations";
export const RECOMMENDATION_GENRES_PATH = `${RECOMMENDATIONS_PATH}/available-genre-seeds`;

export const getArtistsSearchPath = queryString => {
  // "https://api.spotify.com/v1/search?query=tania+bowra\u0026offset=0\u0026limit=20\u0026type=artist"
  const LIMIT = 6;

  return `search/?query=${queryString}\u0026type=artist\u0026limit=${LIMIT}`;
};

const targetAttributeQueryArgs = attributes => {
  const selectedAttributes = Object.values(attributes).filter(
    attribute => attribute.isSelected === true
  );
  const packagedQueryParams = selectedAttributes.reduce((prev, curr) => {
    let attributeName = curr.name.toLowerCase();
    const attributeParamKey = `target_${attributeName}`;
    let value = curr.value;

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
    } else if (isGenreSeed(curr)) {
      return {
        ...prev,
        seed_genres: [...prev.seed_genres, curr.id]
      };
    } else {
      throw new Error("Recommendation seed of unknown type");
    }
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
export const createPlaylistData = {
  name: "Shane's New Playlist",
  description: "New playlist description",
  public: false
};

export const addTracksToPlaylistPath = playlistId =>
  `playlists/${playlistId}/tracks`;
export const addTracksToPlaylistData = trackURIs => ({
  uris: trackURIs
  // uris: 'nope',
});
